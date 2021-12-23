import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getAllTopics = () => {
  let result = [];
  const files = fs.readdirSync(path.join("content/posts"));
  files.forEach((file) => {
    const fileContents = fs.readFileSync(
      path.join("content/posts", file),
      "utf-8"
    );
    const { data: frontmatter } = matter(fileContents);
    if (frontmatter.tags) {
      frontmatter.tags.forEach((tag) => {
        const slugifiedTopic = tag.toLowerCase();
        if (!result.includes({ params: { tag: slugifiedTopic } }))
          result.push({ params: { tag_name: slugifiedTopic } });
      });
    }
  });

  return result;
};
