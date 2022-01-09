const RSS = require("rss");
const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const CONFIG = require("./config/index.js");

const blogPostDir = path.resolve(__dirname, "content", "posts");

function parseMarkdown(markdownText, char) {
  const charLimit = char || 500;
  const htmlText = markdownText
    // hide h3 title
    .toString()
    .replace(/^### (.*$)/gim, "")
    // hide h2 title
    .toString()
    .replace(/^## (.*$)/gim, "")
    // hide h1 title
    .toString()
    .replace(/^# (.*$)/gim, "")
    // replace italic to normal text
    .toString()
    .replace(/^\> (.*$)/gim, "$1")
    // replace bold to normal text
    .toString()
    .replace(/\*\*(.*)\*\*/gim, "$1")
    .toString()
    .replace(/\*(.*)\*/gim, "")
    .toString()
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "")
    .toString()
    .replace(/\[(.*?)\]\((.*?)\)/gim, "$1")
    .toString()
    .replace(/\n$/gim, "");

  return htmlText.trim().slice(0, charLimit);
}

const getExcerpt = (markdownText, char) => {
  const excerpt = parseMarkdown(markdownText, char);
  return excerpt;
};

// setup our feed instance with some high level data
// I often keep this kind of data in package.json or a config file
// so that it can be shared with other things that need it, i.e. next-seo
const feed = new RSS({
  title: CONFIG.TITLE,
  description: CONFIG.DESCRIPTION,
  feed_url: CONFIG.URL + `/rss.xml`,
  site_url: CONFIG.URL,
  managingEditor: CONFIG.AUTHOR_NAME,
  webMaster: CONFIG.AUTHOR_NAME,
  copyright: CONFIG.COPYRIGHT,
  language: "zh-HK",
  pubDate: new Date().toLocaleString(),
  ttl: "60",
});

// read all the files in my blog post dir, however you can grab
// an array of data however, via node-fetch or json files, etc
fs.readdirSync(blogPostDir)
  .map((fileName) => {
    // we need the full path of the file to be able to read it
    const fullPath = path.join(blogPostDir, fileName);
    // read the file so we can grab the front matter
    const file = fs.readFileSync(fullPath, "utf8");

    // for the RSS feed we don't need the html, we
    // just want the attributes
    const { data: frontmatter, content } = matter(file);
    const excerpt = getExcerpt(content, 800);
    // console.log(excerpt);
    // I want access to the fileName later on so we save it to our object
    return { ...frontmatter, fileName, excerpt };
  })
  // sort the items by date in descending order, feel free
  // to customize this as needed to sort your RSS items properly
  .filter((post) => post.draft === false)
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  // loop over each blog post and add it to our RSS feed
  .forEach(({ title, date, tags, category, fileName, excerpt }) => {
    // title, description, and date are properties of my front matter
    // attributes. Yours might be different depending on your data structure
    feed.item({
      title,
      description: excerpt,
      url: CONFIG.URL + `/posts/` + `${fileName.replace(".md", "")}` + `/`,
      author: CONFIG.AUTHOR_NAME,
      categories: tags,
      date,
    });
  });

const xml = feed.xml();

// NextJS looks for static files in the public directory, so that is
// where we will write our file
fs.writeFileSync(path.resolve(__dirname, "public") + "/rss.xml", xml);
