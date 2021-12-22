import Layout from "@/components/Layout";
import { Box, Text, Heading, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <Layout>
      <Heading>404 Not Found</Heading>
      <Link href="/" passHref>
        <Button leftIcon={<FaChevronLeft />}>Back</Button>
      </Link>
    </Layout>
  );
}
