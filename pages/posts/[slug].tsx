import Layout from "@/components/Layout";
import { Heading, Box, UnorderedList, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getAllPostIds, getPostData } from "../../lib/posts";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";
import Link from "next/link";

export default function PostPage({
  frontmatter: { title, category, date, socialImage, tags },
  content,
  slug,
}) {
  return (
    <Layout title={title}>
      <Heading>{title}</Heading>
      {/* <img src={socialImage} alt="" /> */}
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      {console.log(slug)}
      <UnorderedList>
        {tags.map((tag) => (
          <Link href={`/tag/${tag.toLowerCase()}`}>
            <a>
              <ListItem>{tag}</ListItem>
            </a>
          </Link>
        ))}
      </UnorderedList>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("content/posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
