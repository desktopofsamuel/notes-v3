import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import Post from "@/components/Post";
import { sortByDate } from "../../utils";
import { POSTS_PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";
import { PostType } from "@/types/post";
import Now from "@/components/Now";

const HomePage = ({
  posts,
  numPages,
  currentPage,
}: {
  posts: any;
  numPages: number;
  currentPage: number;
}) => {
  return (
    <Layout>
      <Heading fontSize="md">近期 Now</Heading>

      {currentPage == 1 && <Now />}
      <Grid>
        {posts.map((post: PostType, index: number) => (
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

export async function getStaticProps({ params }: { params: any }) {
  const files = getPosts();
  const page = parseInt((params && params.page_index) || 1);
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = files
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  };
}
