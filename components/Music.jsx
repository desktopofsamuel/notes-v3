import { useEffect, useState } from "react";
import useSWR from "swr";
import Parser from "rss-parser";
import NextLink from "./NextLink";
import {
  Box,
  Text,
  chakra,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Tooltip,
  Center,
  Image,
  keyframes,
} from "@chakra-ui/react";

import fetcher from "@/lib/fetcher";
// import Image from "next/image";

const bounce = keyframes`
10% {
    transform: scaleY(0.3); /* start by scaling to 30% */
  }

  30% {
    transform: scaleY(1); /* scale up to 100% */
  }

  60% {
    transform: scaleY(0.5); /* scale down to 50% */
  }

  80% {
    transform: scaleY(0.75); /* scale up to 75% */
  }

  100% {
    transform: scaleY(0.6); /* scale down to 60% */
  }
`;

const animation = `${bounce} 2.2s ease infinite alternate`;

const Music = () => {
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

  const { data } = useSWR("/api/top-artists", fetcher);
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
        <Text variant="small">🎧 最近聽</Text>
        <SimpleGrid
          columns={2}
          row={2}
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          {console.log(data)}
          {!data ? (
            <p>Loading </p>
          ) : (
            data.map((artist, i) => (
              <Center textAlign="center" flexDirection="column" key={i}>
                <NextLink
                  title={`Listen to ${artist.name} now on Spotify`}
                  target="_blank"
                  href={artist.link}
                  variant="noeffect"
                  isExternal
                >
                  <Box
                    w="80px"
                    h="80px"
                    role="group"
                    backgroundColor="black"
                    borderRadius="50%"
                    position="relative"
                    transition="all 100ms ease-in-out"
                  >
                    <Box
                      position="absolute"
                      zIndex="100"
                      top="26px"
                      left="26px"
                      opacity={0}
                      w="25px"
                      h="25px"
                      right="0"
                      bottom="0"
                      color="white"
                      transition="all 100ms ease-in-out"
                      _groupHover={{ opacity: 1 }}
                    >
                      {/* <FaVolumeDown size="20px" /> */}
                      <Box
                        position="relative"
                        display="flex"
                        justifyContent="space-between"
                        width="30px"
                        height="30px"
                      >
                        <Box
                          backgroundColor="white"
                          width="4px"
                          height="100%"
                          borderRadius="6px"
                          animation={animation}
                          transformOrigin="bottom"
                        />
                        <Box
                          backgroundColor="white"
                          width="4px"
                          height="100%"
                          borderRadius="6px"
                          animation={animation}
                          transformOrigin="bottom"
                          style={{ animationDelay: "-2.2s" }}
                        />
                        <Box
                          backgroundColor="white"
                          width="4px"
                          height="100%"
                          borderRadius="6px"
                          animation={animation}
                          transformOrigin="bottom"
                          style={{ animationDelay: "-3.7s" }}
                        />
                        <Box
                          backgroundColor="white"
                          width="4px"
                          height="100%"
                          borderRadius="6px"
                          animation={animation}
                          transformOrigin="bottom"
                          style={{ animationDelay: "-4.2s" }}
                        />
                      </Box>
                    </Box>
                    <Image
                      position="absolute"
                      top="0"
                      left="0"
                      zIndex="1"
                      w="80px"
                      h="80px"
                      src={artist.image}
                      alt={artist.name}
                      borderRadius="50%"
                      _groupHover={{ opacity: 0.8 }}
                    />
                  </Box>
                </NextLink>
                <Text m="0" mt={2}>
                  {artist.name}
                </Text>
              </Center>
            ))
          )}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Music;
