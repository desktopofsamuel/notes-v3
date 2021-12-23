import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import { UnorderedList, ListItem, Heading } from "@chakra-ui/react";
import { getPosts } from "@/lib/posts";

const CategoryPage = ({ categories }: any) => {
  return (
    <Layout title="Category">
      <Heading as="h1" variant="pagetitle">
        List of Category
      </Heading>
      <UnorderedList>
        {/* {console.log(categories)} */}
        {categories.map((category: string, index: number) => (
          <Link href={`/category/${category.toLowerCase()}`} key={index}>
            <a>
              <ListItem>{category}</ListItem>
            </a>
          </Link>
        ))}
      </UnorderedList>
      {/* <Pagination currentPage={currentPage} numPages={numPages} /> */}
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticProps() {
  const posts = getPosts();
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...Array.from(new Set(categories))];
  console.log(categories);

  // const count = uniqueCategories.size;

  return {
    props: {
      categories: uniqueCategories,
    },
  };
}
