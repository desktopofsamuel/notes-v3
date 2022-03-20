import { useEffect, useState } from "react";
import useSWR from "swr";
import NextLink from "./NextLink";
import {
  Text,
  Grid,
  Tooltip,
  Box,
  useColorModeValue,
  Flex,
  Wrap,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import fetcher from "@/lib/fetcher";

const Typing = () => {

  const { data } = useSWR("/api/typing", fetcher);

  // const { data, error } = useSWR(
  //   "https://damp-lowlands-80262.herokuapp.com/oku",
  //   fetcher
  // );

  // if (error) return "An error has occurred.";
  // if (!data) return "Loading...";

  return (
    <>
      <Box
        backgroundColor={useColorModeValue("gray.50", "gray.700")}
        boxShadow="xs"
        p="4"
        borderRadius="16"
        gridColumn={{ base: "span 2", md: "initial" }}
      >
        <Text variant="small">📚 最近讀</Text>

        {!data ? (
          <p>Loading </p>
        ) : (
         
            console.log(data)
          
        )}
      </Box>
    </>
  );
};

export default Typing;
