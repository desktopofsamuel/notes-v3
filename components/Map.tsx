import React from 'react'
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
import { Map as PigeonMap, Marker } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'

// const maptilerProvider = maptiler(process.env.MAPTILER_API, 'streets')

const MAP_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/114.1168,22.3498,11,0/600x600?before_layer=aerialway&access_token=${process.env.MAPBOX_API}`


export default function Map() {
  return (
    <>
    <Box
      backgroundImage={MAP_URL}
      height={300}
      backgroundPosition="center"
      backgroundSize="cover"
      boxShadow="md"
      p="4"
      borderRadius="16"
      gridColumn={{ base: "span 2", md: "initial" }}
    > 
      <Box backgroundColor="white" display="inline-block" px="3" py="2" borderRadius="full" boxShadow="xs" ><Text variant="small" my="0">📍 Located at</Text></Box>
      <Box borderRadius="full" position="relative" width="24px" height="24px" backgroundColor="red" opacity="0.2" place-content="center"/>
    </Box></>
  )
}
