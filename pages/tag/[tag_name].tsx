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
import { getAllTopics } from "@/lib/getTopics";
import { getPosts } from "@/lib/posts";

const TagPage: NextPage = ({ posts }) => {
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

export default TagPage;

export async function getStaticPaths() {
  const paths = getAllTopics();
  return {
    paths,
    fallback: false,
  };
}

// export async function getStaticPaths() {
//   const files = fs.readdirSync(path.join("content/posts"));
//   const tags = files.map((filename) => {
//     let combinePostTags = [];
//     const markdownWithMeta = fs.readFileSync(
//       path.join("content/posts", filename),
//       "utf-8"
//     );

//     const { data: frontmatter } = matter(markdownWithMeta);
//     const postTags = frontmatter.tags;

//     if (postTags) {
//       const lowerCaseTags = postTags.map((tag) => tag.toLowerCase());
//       if (lowerCaseTags.includes(tag)) {
//         return {
//           tag: tag,
//         };
//       }
//       return null;
//     }
//     return tags;
//   });
// console.log(eachPostTags);

// function combinetags(postTags) {
//   for (const i = 0; i < postTags.length)

// const listofTags = combinetags(postTags)
// }

// // const listofTags = [...postTags];
// console.log(listofTags);
// console.log(paths);
// combinePostTags.push(eachPostTags);
// return combinePostTags;

// console.log(tags);

// const paths = combinetags.map((tag) => ({
//   params: { tag_name: tag },
// }));

// console.log(paths);

// return {
//   paths,
//   fallback: false,
// };
// }

export async function getStaticProps({ params: { tag_name } }) {
  const posts = getPosts();

  // Filter post by tag
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag_name)
  );

  return {
    props: {
      posts: filteredPosts,
    },
  };
}
