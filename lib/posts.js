import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils/index";
import { POSTS_PER_PAGE } from "@/config/index";
import { marked } from "marked";
import { getExcerpt } from "./getExcerpt";

const files = fs.readdirSync(path.join("content/posts"));
// Markdown Parser from https://www.bigomega.dev/markdown-parser

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
    const excerpt = getExcerpt(content, 300);
    // console.log(excerpt);
    // console.log(excerpt);
    // const slug = frontmatter.slug || id;

    return { slug, frontmatter, excerpt };
  });

  return posts
    .filter((post) => post.frontmatter.draft === false)
    .sort(sortByDate);
}
