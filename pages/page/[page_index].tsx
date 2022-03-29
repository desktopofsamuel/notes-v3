import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { Collapse, forwardRef, Flex, Heading, VStack, IconButton, useDisclosure } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import Post from "@/components/Post";
import { sortByDate } from "../../utils";
import { POSTS_PER_PAGE } from "../../config";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";
import { PostType } from "@/types/post";
import Now from "@/components/Now";
import CONFIG from "../../config";
import {
  FaChevronDown,
  FaChevronUp,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useState } from "react"

const HomePage = ({
  posts,
  numPages,
  currentPage,
}: {
  posts: any;
  numPages: number;
  currentPage: number;
}) => {
  const { isOpen, onToggle, onClose, getDisclosureProps } = useDisclosure()
  const [hidden, setHidden] = useState(!isOpen);
  return (
    <Layout
      title={currentPage == 1 ? "" : `所有文章 —— 第` + currentPage + `頁`}
    >
      {currentPage == 1 && (
        <>
          <Flex justifyContent="space-between" alignItems="baseline" width="100%">
            <Heading fontSize="md">近期 Now</Heading>
            <IconButton
            width="4"
            aria-label="Hide All Now"
            variant="solid"
            colorScheme="gray"
            isRound
            onClick={onToggle}
            icon={ isOpen ? <FaChevronDown/> : <FaChevronUp/>}
            />
        </Flex>
        <Now isOpen={!isOpen} getDisclosureProps forwardRef/>
        </>
      )}
      <VStack spacing="8">
        {posts.map((post: PostType, index: number) => (
          <Post post={post} key={index} />
        ))}
      </VStack>
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
