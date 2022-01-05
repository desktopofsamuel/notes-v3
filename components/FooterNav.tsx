import { FOOTER_NAV } from "../config";
import { Flex, UnorderedList, ListItem } from "@chakra-ui/react";
import NextLink from "@/components/NextLink";

export default function FooterNav() {
  return (
    <div>
      <UnorderedList
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="4"
      >
        {FOOTER_NAV.map((item) => (
          <ListItem key={item.path} listStyleType="none" m="0">
            <NextLink href={item.path} variant="navigation">
              {item.label}
            </NextLink>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
}
