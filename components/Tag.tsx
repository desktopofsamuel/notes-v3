import React from "react";
import {
  Tag as ChakraTag,
  TagLeftIcon,
  TagLabel,
  ListItem,
} from "@chakra-ui/react";
import { FaHashtag } from "react-icons/fa";
import NextLink from "@/components/NextLink";

export default function Tag({ children, href }: TagProps) {
  return (
    <ListItem>
      <NextLink href={`/tag/${href.toLowerCase()}`} passHref variant="noeffect">
        <ChakraTag
          variant="subtle"
          px="3"
          py="2"
          borderRadius="full"
          transition="all 300ms ease-in-out"
          _hover={{ background: "primary.500", color: "white" }}
        >
          <TagLeftIcon width="10px" as={FaHashtag} mr="1" />
          <TagLabel fontWeight="bold">{children}</TagLabel>
        </ChakraTag>
      </NextLink>
    </ListItem>
  );
}

type TagProps = {
  children?: React.ReactNode;
  href: string;
};
