const RSS = require("rss");
const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const { remark } = require("remark");
const remarkHtml = require("remark-html");
const CONFIG = require("./config.js");

const blogPostDir = path.resolve(__dirname, "content", "posts");
const outputDir = path.resolve(__dirname, "public");

// Utility functions
const cleanImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  try {
    let cleanUrl = imageUrl.trim();
    if (!cleanUrl.startsWith("http")) {
      cleanUrl = `${CONFIG.URL}${
        cleanUrl.startsWith("/") ? "" : "/"
      }${cleanUrl}`;
    }
    const urlObj = new URL(cleanUrl);
    urlObj.pathname = urlObj.pathname
      .split("/")
      .map(encodeURIComponent)
      .join("/");
    return urlObj.toString();
  } catch (error) {
    console.warn(`Warning: Invalid image URL ${imageUrl}:`, error.message);
    return null;
  }
};

const encodeUrl = (url) => {
  try {
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname
      .split("/")
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");
    return urlObj.toString();
  } catch (error) {
    console.warn(`Warning: Could not encode URL ${url}:`, error.message);
    return url;
  }
};

const markdownToHtml = async (markdown) => {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
};

const getExcerpt = (markdownText, charLimit = 280) => {
  if (!markdownText) return "";
  const plainText = markdownText
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Keep link text
    .replace(/#{1,6}\s/g, "") // Remove headers
    .replace(/[*_`~]/g, "") // Remove emphasis characters
    .replace(/\s+/g, " ")
    .trim();
  return plainText.length > charLimit
    ? `${plainText.slice(0, charLimit)}...`
    : plainText;
};

const validateFrontmatter = (frontmatter, fileName) => {
  const requiredFields = ["title", "date"];
  const missing = requiredFields.filter((field) => !frontmatter[field]);
  if (missing.length) {
    console.warn(
      `⚠️ Warning: Missing required fields in ${fileName}: ${missing.join(
        ", "
      )}`
    );
    return false;
  }
  if (isNaN(new Date(frontmatter.date))) {
    console.warn(
      `⚠️ Warning: Invalid date format in ${fileName}: ${frontmatter.date}`
    );
    return false;
  }
  return true;
};

const generateGuid = (url, date) =>
  `${CONFIG.URL}${url}#${new Date(date).getTime()}`;

const createSlug = (fileName) =>
  path.basename(fileName, path.extname(fileName));

// RSS Feed Configuration
const RSS_CONFIG = {
  title: CONFIG.TITLE,
  description: CONFIG.DESCRIPTION,
  feed_url: `${CONFIG.URL}/rss.xml`,
  site_url: CONFIG.URL,
  image_url: `${CONFIG.URL}${CONFIG.OG_IMAGE}`,
  managingEditor: `${CONFIG.AUTHOR_NAME} (${
    CONFIG.EMAIL || "noreply@desktopofsamuel.com"
  })`,
  webMaster: `${CONFIG.AUTHOR_NAME} (${
    CONFIG.EMAIL || "noreply@desktopofsamuel.com"
  })`,
  copyright: CONFIG.COPYRIGHT,
  language: CONFIG.LOCALE,
  pubDate: new Date().toISOString(),
  lastBuildDate: new Date().toISOString(),
  generator: "Custom RSS Generator",
  docs: "https://www.rssboard.org/rss-specification",
  ttl: 60,
  categories: CONFIG.KEYWORDS.split(",").map((k) => k.trim()),
  custom_namespaces: {
    atom: "http://www.w3.org/2005/Atom",
    content: "http://purl.org/rss/1.0/modules/content/",
    dc: "http://purl.org/dc/elements/1.1/",
    sy: "http://purl.org/rss/1.0/modules/syndication/",
  },
};

// Main RSS generation function
const generateRSS = async () => {
  console.log("🚀 Starting RSS feed generation...");

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const feed = new RSS(RSS_CONFIG);

    const postFiles = fs
      .readdirSync(blogPostDir)
      .filter((file) => file.endsWith(".md"));

    const posts = (
      await Promise.all(
        postFiles.map(async (fileName) => {
          try {
            const fullPath = path.join(blogPostDir, fileName);
            const fileContent = fs.readFileSync(fullPath, "utf8");
            const { data: frontmatter, content } = matter(fileContent);

            if (!validateFrontmatter(frontmatter, fileName)) return null;

            const slug = createSlug(fileName);
            const fullContent = await markdownToHtml(content);
            const excerpt = getExcerpt(content);

            return {
              ...frontmatter,
              slug,
              fullContent,
              excerpt,
            };
          } catch (error) {
            console.error(`❌ Error processing ${fileName}:`, error.message);
            return null;
          }
        })
      )
    )
      .filter(Boolean)
      .filter((post) => post.draft !== true)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`📝 Found ${posts.length} published posts`);

    posts.forEach(
      ({
        title,
        date,
        tags,
        excerpt,
        fullContent,
        slug,
        socialImage,
      }) => {
        const itemUrl = `${CONFIG.URL}/posts/${slug}/`;
        const encodedUrl = encodeUrl(itemUrl);
        const guid = generateGuid(encodedUrl, date);

        const item = {
          title: title || "Untitled",
          description: excerpt,
          url: encodedUrl,
          guid,
          author: CONFIG.AUTHOR_NAME,
          categories: tags || [],
          date: new Date(date).toISOString(),
          custom_elements: [
            { "content:encoded": `<![CDATA[${fullContent}]]>` },
            { "dc:creator": CONFIG.AUTHOR_NAME },
            { "dc:date": new Date(date).toISOString() },
          ],
        };

        if (socialImage) {
          const cleanedImageUrl = cleanImageUrl(socialImage);
if (cleanedImageUrl) {
  item.enclosure = {
    url: cleanedImageUrl,
    type: 'image/jpeg' // Or determine dynamically
  };
}
        }

        feed.item(item);
      }
    );

    const xml = feed.xml({ indent: true });
    if (!xml) throw new Error("Generated RSS XML is empty");

    const outputPath = path.join(outputDir, "rss.xml");
    fs.writeFileSync(outputPath, xml);

    console.log(`✅ RSS feed generated successfully: ${outputPath}`);
    console.log(`📊 Feed contains ${posts.length} items`);
    console.log(`🔗 Feed URL: ${RSS_CONFIG.feed_url}`);

    return true;
  } catch (error) {
    console.error("❌ Error generating RSS feed:", error.message);
    process.exit(1);
  }
};

// Run RSS generation
if (require.main === module) {
  generateRSS();
}

module.exports = { generateRSS };

