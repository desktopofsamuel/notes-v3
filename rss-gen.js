const RSS = require("rss");
const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const CONFIG = require("./config.js");

const blogPostDir = path.resolve(__dirname, "content", "posts");
const outputDir = path.resolve(__dirname, "public");

// RSS Feed Configuration
const RSS_CONFIG = {
  title: CONFIG.TITLE,
  description: CONFIG.DESCRIPTION,
  feed_url: `${CONFIG.URL}/rss.xml`,
  site_url: CONFIG.URL,
  image_url: `${CONFIG.URL}${CONFIG.OG_IMAGE}`,
  managingEditor: `${CONFIG.AUTHOR_NAME} (${CONFIG.EMAIL || 'noreply@desktopofsamuel.com'})`,
  webMaster: `${CONFIG.AUTHOR_NAME} (${CONFIG.EMAIL || 'noreply@desktopofsamuel.com'})`,
  copyright: CONFIG.COPYRIGHT,
  language: CONFIG.LOCALE,
  pubDate: new Date().toISOString(),
  lastBuildDate: new Date().toISOString(),
  generator: "Custom RSS Generator",
  docs: "https://www.rssboard.org/rss-specification",
  ttl: 60,
  categories: CONFIG.KEYWORDS.split(',').map(k => k.trim()),
  custom_namespaces: {
    'atom': 'http://www.w3.org/2005/Atom',
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'dc': 'http://purl.org/dc/elements/1.1/',
    'sy': 'http://purl.org/rss/1.0/modules/syndication/'
  }
};

/**
 * Encode URL to handle Chinese characters and special characters
 * @param {string} url - URL to encode
 * @returns {string} Encoded URL
 */
function encodeUrl(url) {
  try {
    // Split URL into parts
    const urlParts = url.split('/');
    const encodedParts = urlParts.map(part => {
      // Don't encode protocol, domain, or empty parts
      if (part === '' || part.includes('://') || part.includes('.')) {
        return part;
      }
      // Encode the path segments
      return encodeURIComponent(part);
    });
    return encodedParts.join('/');
  } catch (error) {
    console.warn(`Warning: Could not encode URL ${url}:`, error.message);
    return url;
  }
}

/**
 * Clean and validate image URL for enclosure
 * @param {string} imageUrl - Raw image URL
 * @returns {string|null} Cleaned image URL or null if invalid
 */
function cleanImageUrl(imageUrl) {
  if (!imageUrl) return null;
  
  try {
    let cleanUrl = imageUrl.trim();
    
    // Remove spaces and parentheses from filename
    cleanUrl = cleanUrl.replace(/\s+/g, '').replace(/[()]/g, '');
    
    // Ensure it's a full URL
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = `${CONFIG.URL}${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`;
    }
    
    // Basic URL validation
    new URL(cleanUrl);
    return cleanUrl;
  } catch (error) {
    console.warn(`Warning: Invalid image URL ${imageUrl}:`, error.message);
    return null;
  }
}

/**
 * Sanitize and clean markdown content for RSS
 * @param {string} markdownText - Raw markdown content
 * @param {number} charLimit - Character limit for excerpt
 * @returns {string} Cleaned HTML content
 */
function parseMarkdown(markdownText, charLimit = 500) {
  if (!markdownText || typeof markdownText !== 'string') {
    return '';
  }

  let htmlText = markdownText
    .toString()
    // Remove headers (h1, h2, h3)
    .replace(/^#{1,3}\s+(.*$)/gim, "")
    // Remove blockquotes
    .replace(/^>\s+(.*$)/gim, "$1")
    // Remove bold formatting
    .replace(/\*\*(.*?)\*\*/gim, "$1")
    // Remove italic formatting
    .replace(/\*(.*?)\*/gim, "$1")
    // Remove images but keep alt text
    .replace(/!\[(.*?)\]\([^)]*\)/gim, "$1")
    // Convert markdown links to plain text
    .replace(/\[([^\]]+)\]\([^)]*\)/gim, "$1")
    // Remove code blocks
    .replace(/```[\s\S]*?```/gim, "")
    // Remove inline code
    .replace(/`([^`]+)`/gim, "$1")
    // Remove horizontal rules
    .replace(/^---$/gim, "")
    // Clean up multiple newlines
    .replace(/\n\s*\n/gim, "\n")
    // Remove trailing whitespace
    .replace(/\s+$/gim, "");

  return htmlText.trim().slice(0, charLimit);
}

/**
 * Generate excerpt from markdown content
 * @param {string} markdownText - Raw markdown content
 * @param {number} charLimit - Character limit for excerpt
 * @returns {string} Clean excerpt
 */
const getExcerpt = (markdownText, charLimit = 800) => {
  const excerpt = parseMarkdown(markdownText, charLimit);
  return excerpt + (excerpt.length >= charLimit ? '...' : '');
};

/**
 * Generate full HTML content from markdown with proper XML escaping
 * @param {string} markdownText - Raw markdown content
 * @returns {string} HTML content
 */
const getFullContent = (markdownText) => {
  if (!markdownText || typeof markdownText !== 'string') {
    return '';
  }

  return markdownText
    .toString()
    // Convert headers to HTML
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Convert blockquotes
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
    // Convert bold
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    // Convert italic
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Convert images
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />')
    // Convert links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    // Convert code blocks
    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
    // Convert inline code
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    // Convert line breaks
    .replace(/\n/gim, "<br />")
    // XML escape special characters (must be done last)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

/**
 * Validate frontmatter data
 * @param {Object} frontmatter - Frontmatter data
 * @param {string} fileName - File name for error reporting
 * @returns {boolean} Whether frontmatter is valid
 */
function validateFrontmatter(frontmatter, fileName) {
  const requiredFields = ['title', 'date'];
  const missingFields = requiredFields.filter(field => !frontmatter[field]);
  
  if (missingFields.length > 0) {
    console.warn(`⚠️  Warning: Missing required fields in ${fileName}: ${missingFields.join(', ')}`);
    return false;
  }
  
  // Validate date format
  if (frontmatter.date && isNaN(new Date(frontmatter.date).getTime())) {
    console.warn(`⚠️  Warning: Invalid date format in ${fileName}: ${frontmatter.date}`);
    return false;
  }
  
  return true;
}

/**
 * Generate unique GUID for RSS item
 * @param {string} url - Item URL
 * @param {string} date - Publication date
 * @returns {string} Unique GUID
 */
function generateGuid(url, date) {
  return `${CONFIG.URL}${url}#${new Date(date).getTime()}`;
}

/**
 * Create a URL-safe slug from filename
 * @param {string} fileName - Original filename
 * @returns {string} URL-safe slug
 */
function createSlug(fileName) {
  return fileName.replace('.md', '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
}

/**
 * Main RSS generation function
 */
function generateRSS() {
  console.log('🚀 Starting RSS feed generation...');
  
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create RSS feed instance
    const feed = new RSS(RSS_CONFIG);

    // Read and process blog posts
    const posts = fs.readdirSync(blogPostDir)
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        try {
          const fullPath = path.join(blogPostDir, fileName);
          const file = fs.readFileSync(fullPath, "utf8");
          const { data: frontmatter, content } = matter(file);
          
          // Validate frontmatter
          if (!validateFrontmatter(frontmatter, fileName)) {
            return null;
          }
          
          const excerpt = getExcerpt(content, 800);
          const fullContent = getFullContent(content);
          const slug = createSlug(fileName);
          
          return { 
            ...frontmatter, 
            fileName, 
            excerpt, 
            fullContent,
            slug
          };
        } catch (error) {
          console.error(`❌ Error processing ${fileName}:`, error.message);
          return null;
        }
      })
      .filter(post => post !== null)
      .filter(post => post.draft !== true)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`📝 Found ${posts.length} published posts`);

    // Add items to RSS feed
    posts.forEach(({ title, date, tags, category, fileName, excerpt, fullContent, slug, socialImage }) => {
      const itemUrl = `${CONFIG.URL}/posts/${slug}/`;
      const encodedUrl = encodeUrl(itemUrl);
      const guid = generateGuid(encodedUrl, date);
      
      const item = {
        title: title || 'Untitled',
        description: excerpt,
        url: encodedUrl,
        guid: guid,
        author: CONFIG.AUTHOR_NAME,
        categories: tags || [],
        date: new Date(date).toISOString(),
        custom_elements: [
          { 'content:encoded': fullContent },
          { 'dc:creator': CONFIG.AUTHOR_NAME },
          { 'dc:date': new Date(date).toISOString() }
        ]
      };

      // Add enclosure if social image exists and is valid
      if (socialImage) {
        const cleanImageUrl = cleanImageUrl(socialImage);
        if (cleanImageUrl) {
          item.enclosure = {
            url: cleanImageUrl,
            type: 'image/jpeg'
          };
        }
      }

      feed.item(item);
    });

    // Generate RSS XML
    const xml = feed.xml({ indent: true });
    
    // Validate XML output
    if (!xml || xml.length === 0) {
      throw new Error('Generated RSS XML is empty');
    }

    // Write RSS file
    const outputPath = path.join(outputDir, 'rss.xml');
    fs.writeFileSync(outputPath, xml);
    
    console.log(`✅ RSS feed generated successfully: ${outputPath}`);
    console.log(`📊 Feed contains ${posts.length} items`);
    console.log(`🔗 Feed URL: ${RSS_CONFIG.feed_url}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error.message);
    process.exit(1);
  }
}

// Run RSS generation
if (require.main === module) {
  generateRSS();
}

module.exports = { generateRSS, parseMarkdown, getExcerpt, getFullContent };
