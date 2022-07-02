import { useEffect, useState } from "react";
import useSWR from "swr";
import NextLink from "./NextLink";
import {
  Text,
  Grid,
  Heading,
  Tooltip,
  Box,
  useColorModeValue,
  Flex,
  Wrap,
  SimpleGrid,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import fetcher from "@/lib/fetcher";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  const { data, error } = useSWR("/api/books", fetcher);

  // Array.prototype.sample = function () {
  //   return this[Math.floor(Math.random() * this.length)];
  // };

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
        p="4"
        boxShadow="sm"
        transition="all ease-in-out 200ms"
        _hover={{ boxShadow: "md" }}
        borderRadius="16"
        gridColumn={{ base: "span 2", md: "initial" }}
      >
        <Text variant="small">📚 最近讀</Text>
        {!data ? (
          <>
            <Skeleton width="50%" /> <Skeleton />
            <Skeleton width="50%" /> <Skeleton />
            <Skeleton width="50%" /> <Skeleton />
            <Skeleton width="50%" /> <Skeleton />
          </>
        ) : (
          data.map((item, i) => (
            <Grid
              key={i}
              mb="2"
              borderRadius="2xl"
              gridTemplateColumns="max-content auto"
              gap="2"
            >
              {/* <Text variant="small">{["📚", "📖", "📕", "📒", "📔", "📙","📘"].sample()}</Text> */}
              <Box>
                <NextLink
                  href={item.link}
                  title={`Read more about ${item.name} on Oku`}
                  display="flex"
                  alignItems="center"
                  variant="noeffect"
                  target="_blank"
                  isExternal
                >
                  <Heading
                    my="0"
                    fontSize="md"
                    fontWeight="bold"
                    lineHeight="8"
                  >
                    {item.name || <Skeleton />}
                  </Heading>
                  <ExternalLinkIcon mx="2" />
                </NextLink>
                <Text m="0" fontSize="xs" textTransform="uppercase">
                  {`by ${item.author}` || <Skeleton />}
                </Text>
              </Box>
            </Grid>
          ))
        )}
      </Box>
    </>
  );
};

export default Books;
