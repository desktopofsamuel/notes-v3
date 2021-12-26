import { useEffect, useState } from "react";
import Parser from "rss-parser";
import NextLink from "./NextLink";
import { Text, Grid, Tooltip, Box, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";

const RssFeed = () => {
  const [feed, setFeed] = useState({ title: "", items: [] });

  /* ImageParser for Letterboxd Film Poster */
  function imageParser(htmlString) {
    let imgLink = null;
    const searchTerm = `\"/></p>`;
    const imgTagPosition = htmlString.indexOf(searchTerm);
    const elements = htmlString.slice(14, imgTagPosition); // Delete string after the img tag
    imgLink = elements.replace("0-500-0-750", "0-200-0-300"); // Load a smaller image
    return imgLink;
  }

  const rssData = async () => {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    let parser = new Parser();

    try {
      const feed = await parser.parseURL(
        `${CORS_PROXY}https://letterboxd.com/samuelisme/rss`
      );
      setFeed(feed);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    rssData();
  }, []);

  return (
    <>
      <Box
        backgroundColor={useColorModeValue("gray.100", "gray.700")}
        p="4"
        borderRadius="16"
        gridColumn="span 2"
      >
        <Text m="0" mb="2">
          🎬 最近在看
        </Text>
        <Grid gridTemplateColumns="repeat(5, 1fr)" transform="scale(0.9)">
          {feed.items.slice(0, 5).map((item, i) => (
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
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default RssFeed;
