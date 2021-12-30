import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils/index";
import { POSTS_PER_PAGE } from "@/config/index";
import { marked } from "marked";

const files = fs.readdirSync(path.join("content/posts"));
// Markdown Parser from https://www.bigomega.dev/markdown-parser
function parseMarkdown(markdownText) {
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

  return htmlText.trim();
}

//
export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("content/posts", filename),
      "utf-8"
    );
    // const id = filename.replace(/\.md$/, "");

    const { data: frontmatter, content } = matter(markdownWithMeta);
    const extract = content.slice(0, 300);
    const excerpt = parseMarkdown(extract);
    // console.log(excerpt);
    // console.log(excerpt);
    // const slug = frontmatter.slug || id;

    return { slug, frontmatter, excerpt };
  });

  return posts
    .filter((post) => post.frontmatter.draft === false)
    .sort(sortByDate);
}
