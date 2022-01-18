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

const Books = () => {
  // const [feed, setFeed] = useState({ title: "", items: [] });
  // const rssData = async () => {
  //   // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  //   let parser = new Parser();

  //   try {
  //     const feed = await parser.parseURL(
  //       `https://damp-lowlands-80262.herokuapp.com/oku`
  //     );
  //     setFeed(feed);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   rssData();
  // }, []);

  // function fetcher(url) {
  //   let parser = new Parser();
  //   const result = parser.parseURL(url);
  //   console.log(result);
  //   return result;
  // }

  const { data } = useSWR("/api/book", fetcher);

  // const { data, error } = useSWR(
  //   "https://damp-lowlands-80262.herokuapp.com/oku",
  //   fetcher
  // );

  // if (error) return "An error has occurred.";
  // if (!data) return "Loading...";

  return (
    <>
      <Box
        backgroundColor={useColorModeValue("gray.100", "gray.700")}
        p="4"
        borderRadius="16"
        gridColumn={{ base: "span 2", md: "initial" }}
      >
        <Text variant="small">📚 最近讀</Text>

        {!data ? (
          <p>Loading </p>
        ) : (
          data.map((item, i) => (
            <Box key={i} mb="4">
              <NextLink
                fontSize="lg"
                fontWeight="bold"
                lineHeight="0"
                href={item.link}
                title={`Read more about ${item.name} on Oku`}
                target="_blank"
                isExternal
              >
                {item.name} <ExternalLinkIcon mx="2px" />
              </NextLink>

              <Text m="0" fontSize="xs" textTransform="uppercase">
                by {item.author}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default Books;
