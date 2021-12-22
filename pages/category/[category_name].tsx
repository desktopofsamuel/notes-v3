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

const CategoryPage: NextPage = ({ posts, numPages, currentPage }) => {
  return (
    <Layout title="Create Next App">
      <Heading>Desktop of Samuel</Heading>
      <Text> Hello from the otherside.</Text>
      <Grid>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </Grid>
      {/* <Pagination currentPage={currentPage} numPages={numPages} /> */}
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/posts"));
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("content/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  // console.log(categories);

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { category_name } }) {
  const files = fs.readdirSync(path.join("content/posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("content/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  // console.log(category_name.category_name);

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );
  console.log(categoryPosts);
  return {
    props: {
      posts: categoryPosts.sort(sortByDate).slice(0, 6),
    },
  };
}
