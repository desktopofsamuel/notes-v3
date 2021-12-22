import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "@/components/Layout";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "@/components/Post";
import { sortByDate } from "../../utils";
import { POSTS_PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";

const HomePage: NextPage = ({ posts, numPages, currentPage }) => {
  return (
    <Layout title="Create Next App">
      <Heading>Desktop of Samuel</Heading>
      <Text> Hello from the otherside.</Text>
      <Grid>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </Grid>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
};

export default HomePage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join("content/posts"));
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

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  {
    console.log(posts, numPages, page);
  }
  const orderedPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

  console.log(posts);

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  };
}
