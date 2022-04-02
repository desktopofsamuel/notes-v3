import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { PostType } from "@/types/post";
import { Button, HStack, Text, Box, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "@/components/NextLink";

export default function Post({ post }: { post: PostType }) {
  // console.log(post);
  return (
    <Box as="article" mb="6" display="grid" justifyItems="baseline">
      <HStack as="span" spacing="2">
        <Text
          as="time"
          fontSize="sm"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {dayjs(post.frontmatter.date).format(`MMMM YYYY`)}
        </Text>
        <Text
          variant="small"
          fontSize="sm"
          color="secondary.400"
          fontWeight="bold"
        >
          {post.frontmatter.category}
        </Text>
      </HStack>
      <NextLink href={`/posts/${post.slug}`} variant="postTitle" passHref>
        <Heading variant="title" mt="0">
          {post.frontmatter.title}
        </Heading>
      </NextLink>
      <Text noOfLines={3} my="2">
        {post.excerpt}
      </Text>
      <NextLink variant="noeffect" href={`/posts/${post.slug}`}>
      <Button rightIcon={<ArrowForwardIcon />} variant="ghost" ml="-18px" as="a">
          閱讀更多
      </Button> </NextLink>
    </Box>
  );
}
