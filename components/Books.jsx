import { useEffect, useState } from "react";
import useSWR from "swr";
import Parser from "rss-parser";
import NextLink from "./NextLink";
import {
  Text,
  Grid,
  Tooltip,
  Box,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

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

  function fetcher(url) {
    let parser = new Parser();
    const result = parser.parseURL(url);
    console.log(result);
    return result;
  }

  const { data, error } = useSWR(
    "https://damp-lowlands-80262.herokuapp.com/oku",
    fetcher
  );

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
        <Text m="0" mb="2">
          📚 最近在讀
        </Text>

        {!data ? (
          <p>Loading </p>
        ) : (
          data.items.slice(0, 5).map((item, i) => (
            <Box key={i} mb="4">
              <NextLink
                fontSize="lg"
                fontWeight="bold"
                lineHeight="0"
                href={item.link}
                title={`Read more about ${item.title} on Oku`}
                target="_blank"
                isExternal
              >
                <HStack>
                  <Text>{item.title}</Text> <FaExternalLinkAlt />
                </HStack>
              </NextLink>

              <Text m="0" fontSize="xs" textTransform="uppercase">
                by {item.creator}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default Books;
