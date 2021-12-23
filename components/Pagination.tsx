import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import internal from "stream";

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
        <Link href={prevPage} passHref>
          <a>
            <Button>Previous Page</Button>
          </a>
        </Link>
      )}
      <p>
        Page {currentPage} of {numPages}{" "}
      </p>
      {!isLast && (
        <Link href={nextPage} passHref>
          <a>
            <Button>Next Page</Button>
          </a>
        </Link>
      )}
    </Flex>
  );
}
