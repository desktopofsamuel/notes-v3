/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Parser from "rss-parser";
import NextLink from "./NextLink";
import {
  chakra,
  Text,
  Grid,
  Tooltip,
  Box,
  Tag,
  ImageProps,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import fetcher from "@/lib/fetcher";

const Films = () => {
  const { data, error } = useSWR("/api/films", fetcher);

  // if (error) return "An error has occurred.";
  // if (!data) return "Loading...";

  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box display="flex" ref={ref}>
      <Image width={200} height={300} alt="" {...rest} />
    </Box>
  ));

  CustomCard.displayName = "CustomCard";

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
            <Box height={200} width="100%"></Box>
          ) : (
            data.map((item, i) => (
              <Box
                key={i}
                mr="-30px"
                zIndex={i * -1}
                borderRadius="4px"
                overflow="hidden"
                transition="all 100ms ease-in-out"
                _hover={{
                  zIndex: "100",
                  transform: "rotate3d(1, 1, 1,2deg) scale3d(1.1, 1.1, 1.1)",
                }}
                boxShadow="2px 0 7px grey;"
              >
                <NextLink href={item.link} target="_blank" variant="noeffect">
                  <Tooltip label={item.name} fontSize="md" mt="10px">
                    {/* <CustomImage src={item.image} alt={item.name} ref={ref} /> */}
                    <CustomCard src={item.image} alt={item.name} />
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
