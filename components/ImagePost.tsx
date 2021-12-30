import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { PostType } from "@/types/post";
import NextLink from "@/components/NextLink";
import {
  chakra,
  Box,
  SimpleGrid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Post({ post }: { post: PostType }) {
  // console.log(post);
  return (
    <NextLink href={`/posts/${post.slug}`} key={post.slug}>
      <Box
        role="group"
        height="500px"
        width="100%"
        position="relative"
        borderRadius="xl"
        overflow="hidden"
      >
        <Box
          bgGradient="linear(to-b, blackAlpha.200, blackAlpha.500)"
          _groupHover={{ opacity: "0.5" }}
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          zIndex="1"
          transition="all 0.2s ease-in-out"
        />
        {post.frontmatter.socialImage && (
          <img
            src={post.frontmatter.socialImage}
            alt={post.frontmatter.title}
            objectFit="cover"
            zIndex="-1"
            height="100%"
            transition="all 0.2s ease-in-out"
            loading="lazy"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        )}

        <VStack
          spacing="2"
          align="flex-start"
          position="absolute"
          bottom="0"
          p="4"
          zIndex="2"
        >
          <Text
            as="time"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
            color="whiteAlpha.700"
          >
            {dayjs(post.frontmatter.date).format(`MMMM YYYY`)}
          </Text>

          <Heading as="h2" fontSize="2xl" mt="2" color="white">
            {post.frontmatter.title}
          </Heading>

          <Text
            noOfLines={3}
            fontSize="sm"
            lineHeight="tall"
            color="whiteAlpha.800"
          >
            {post.excerpt}
          </Text>
        </VStack>
      </Box>
    </NextLink>
  );
}
