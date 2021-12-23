import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils/index";
import { POSTS_PER_PAGE } from "@/config/index";

const files = fs.readdirSync(path.join("content/posts"));

export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("content/posts", filename),
      "utf-8"
    );
    // const id = filename.replace(/\.md$/, "");

    const { data: frontmatter } = matter(markdownWithMeta);
    // const slug = frontmatter.slug || id;

    return { slug, frontmatter };
  });

  return posts.sort(sortByDate);
}
