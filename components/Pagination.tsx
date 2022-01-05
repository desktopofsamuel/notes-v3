import { Flex, Button } from "@chakra-ui/react";
import internal from "stream";
import NextLink from "@/components/NextLink";

export default function Pagination({
  numPages,
  currentPage,
}: {
  numPages: number;
  currentPage: number;
}) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;
  return (
    <Flex justifyContent="space-between" alignItems="center" my="8">
      <NextLink href={prevPage} passHref variant="noeffect">
        <Button isDisabled={isFirst}>上一頁</Button>
      </NextLink>

      <NextLink href={nextPage} passHref variant="noeffect">
        <Button isDisabled={isLast}>下一頁</Button>
      </NextLink>
    </Flex>
  );
}
