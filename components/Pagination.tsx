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
    <Flex justifyContent="space-between" alignItems="center">
      {!isFirst && (
        <NextLink href={prevPage} passHref variant="noeffect">
          <Button>Previous Page</Button>
        </NextLink>
      )}
      <p>
        Page {currentPage} of {numPages}{" "}
      </p>
      {!isLast && (
        <NextLink href={nextPage} passHref variant="noeffect">
          <Button>Next Page</Button>
        </NextLink>
      )}
    </Flex>
  );
}
