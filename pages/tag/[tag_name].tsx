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
import Pagination from "@/components/Pagination";
import { getAllTopics } from "@/lib/getTopics";
import { getPosts } from "@/lib/posts";
import { PostType } from "@/types/post";
import CONFIG from "../../config";
import startCase from "lodash.startcase";
import { NextSeo } from "next-seo";
import { POSTS_PER_PAGE } from "../../config";

const TagPage = ({ posts, tagName }: { posts: any; tagName: string }) => {
  const pageTitle = startCase(tagName);
  return (
    <Layout title={`所有關於"${pageTitle}"的文章`}>
      <NextSeo
        openGraph={{
          url: CONFIG.URL + `/tags/` + tagName,
        }}
      />
      <Heading as="h1">#{pageTitle}</Heading>
      <Grid>
        {posts.map((post: PostType, index: number) => (
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

export async function getStaticProps({
  params: { tag_name },
}: {
  params: { tag_name: string };
}) {
  const posts = getPosts();

  // Filter post by tag
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.tags.map((t: any) => t.toLowerCase()).includes(tag_name)
  );

  return {
    props: {
      posts: filteredPosts,
      tagName: tag_name,
    },
  };
}
