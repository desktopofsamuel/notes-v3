import Layout from "@/components/Layout";
import {
  HStack,
  Text,
  Heading,
  Box,
  UnorderedList,
  ListItem,
  Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";
import Link from "next/link";
import { PostType } from "@/types/post";
import Tag from "@/components/Tag";
import dayjs from "dayjs";
import NextLink from "@/components/NextLink";
import { getExcerpt } from "@/lib/getExcerpt";

export default function PostPage({
  frontmatter,
  content,
  slug,
  excerpt,
}: PostType) {
  return (
    <Layout
      title={frontmatter.title}
      keywords={frontmatter.tags}
      description={excerpt}
    >
      {/* <SEO postFrontmatter={frontmatter} path={slug} postSEO /> */}
      <HStack spacing="2">
        <Text
          as="time"
          fontSize="sm"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {dayjs(frontmatter.date).format(`MMMM YYYY`)}
        </Text>
        <NextLink href={`/category/${frontmatter.category}/`}>
          <Text
            as="small"
            fontSize="sm"
            color="secondary.400"
            fontWeight="bold"
            _hover={{
              color: "secondary.300",
            }}
          >
            {frontmatter.category}
          </Text>
        </NextLink>
      </HStack>
      <Heading variant="pagetitle" mt="2" mb="8">
        {frontmatter.title}
      </Heading>
      {console.log(excerpt)}
      {/* <img src={socialImage} alt="" /> */}
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      {/* {console.log(slug)} */}
      <UnorderedList marginInlineStart="0">
        <Wrap spacing="2">
          {frontmatter.tags &&
            frontmatter.tags.map((tag, index) => (
              <Tag href={tag} key={index}>
                {tag}
              </Tag>
            ))}
        </Wrap>
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

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const markdownWithMeta = fs.readFileSync(
    path.join("content/posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const excerpt = getExcerpt(content, 100);
  return {
    props: {
      frontmatter,
      content,
      excerpt,
      slug,
    },
  };
}
