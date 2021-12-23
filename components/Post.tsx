import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { PostType } from "@/types/post";
import { HStack, Text, Box, Heading } from "@chakra-ui/react";

export default function Post({ post }: { post: PostType }) {
  console.log(post);
  return (
    <Box as="article">
      <HStack spacing="2">
        <Text
          as="time"
          fontSize="sm"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {dayjs(post.frontmatter.date).format(`MMMM YYYY`)}
        </Text>
        <Text as="small" fontSize="sm" color="secondary.400" fontWeight="bold">
          {post.frontmatter.category}
        </Text>
      </HStack>
      <Link href={`/posts/${post.slug}`} passHref>
        <a>
          <Heading variant="title" as="h2" mt="0">
            {post.frontmatter.title}
          </Heading>
        </a>
      </Link>
    </Box>
  );
}
