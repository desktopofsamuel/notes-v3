import Layout from "@/components/Layout";
import { Heading, Box, UnorderedList, ListItem, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";
import Link from "next/link";
import { PostType } from "@/types/post";
import Tag from "@/components/Tag";
import { getExcerpt } from "@/lib/getExcerpt";
import { NextSeo } from "next-seo";
import CONFIG from "../../config";

export default function ContentPageTemplate({
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
      <NextSeo
        openGraph={{
          url: CONFIG.URL + `/pages/` + slug,
          type: "website",
          images: [
            {
              url: frontmatter.socialImage
                ? CONFIG.URL + frontmatter.socialImage
                : CONFIG.URL + CONFIG.OG_IMAGE,
            },
          ],
        }}
      />
      <Heading>{frontmatter.title}</Heading>
      {/* {console.log(excerpt)} */}
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
  const files = fs.readdirSync(path.join("content/pages"));
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
    path.join("content/pages", slug + ".md"),
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
