import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "@/components/Layout";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";
import { PostType } from "@/types/post";
import ImagePost from "@/components/ImagePost";

const CategoryPage = ({
  posts,
  categoryName,
}: {
  posts: any;
  categoryName: string;
}) => {
  return (
    <Layout title={`Posts in ${categoryName}`}>
      <Heading>Posts in {categoryName}</Heading>
      <Grid></Grid>
      {categoryName == "地圖"
        ? posts.map((post: PostType, index: number) => (
            // <Post post={post} key={index} />
            <ImagePost post={post} key={index} />
          ))
        : posts.map((post: PostType, index: number) => (
            // <Post post={post} key={index} />
            <Post post={post} key={index} />
          ))}
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

  // console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { category_name },
}: {
  params: { category_name: string };
}) {
  const posts = getPosts();

  // Filter post by Category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
    },
  };
}
