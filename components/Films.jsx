import { useEffect, useState } from "react";
import useSWR from "swr";
import Parser from "rss-parser";
import NextLink from "./NextLink";
import { Text, Grid, Tooltip, Box, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";

const Films = () => {
  // const [feed, setFeed] = useState({ title: "", items: [] });

  /* ImageParser for Letterboxd Film Poster */
  function imageParser(htmlString) {
    let imgLink = null;
    const searchTerm = `\"/></p>`;
    const imgTagPosition = htmlString.indexOf(searchTerm);
    const elements = htmlString.slice(14, imgTagPosition); // Delete string after the img tag
    imgLink = elements.replace("0-500-0-750", "0-200-0-300"); // Load a smaller image
    return imgLink;
  }

  // const rssData = async () => {
  //   // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  //   let parser = new Parser();

  //   try {
  //     const feed = await parser.parseURL(
  //       `https://damp-lowlands-80262.herokuapp.com/letterboxd`
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
    "https://damp-lowlands-80262.herokuapp.com/letterboxd",
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
        gridColumn="span 2"
        width="100%"
      >
        <Text variant="small">🎬 最近看</Text>
        <Grid gridTemplateColumns="repeat(5, 1fr)" transform="scale(0.9)">
          {!data ? (
            <>
              <Box mr="-30px" boxShadow="2px 0 7px grey;">
                <Box backgroundColor="black" alt="Placeholder Image"></Box>
              </Box>{" "}
              <Box mr="-30px" boxShadow="2px 0 7px grey;">
                <Box backgroundColor="black" alt="Placeholder Image"></Box>
              </Box>{" "}
              <Box mr="-30px" boxShadow="2px 0 7px grey;">
                <Box backgroundColor="black" alt="Placeholder Image"></Box>
              </Box>{" "}
              <Box mr="-30px" boxShadow="2px 0 7px grey;">
                <Box backgroundColor="black" alt="Placeholder Image"></Box>
              </Box>
              <Box mr="-30px" boxShadow="2px 0 7px grey;">
                <Box backgroundColor="black" alt="Placeholder Image"></Box>
              </Box>
            </>
          ) : (
            data.items.slice(0, 5).map((item, i) => (
              <Box
                key={i}
                mr="-30px"
                zIndex={i}
                transition="all 100ms ease-in-out"
                _hover={{
                  zIndex: "100",
                  transform: "rotate3d(1, 1, 1,2deg) scale3d(1.1, 1.1, 1.1)",
                }}
                boxShadow="2px 0 7px grey;"
              >
                <NextLink href={item.link} target="_blank">
                  <Tooltip label={item.title} fontSize="md" mt="10px">
                    <img
                      src={imageParser(item.content)}
                      width="200"
                      height="300"
                      alt={item.title}
                    ></img>
                  </Tooltip>
                </NextLink>
              </Box>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Films;
