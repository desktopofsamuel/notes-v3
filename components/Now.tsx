import Films from "@/components/Films";
import Books from "@/components/Books";
import Music from "@/components/Music";
import Typing from "@/components/Typing";
import Map from "@/components/Map"
import { Text, forwardRef, SimpleGrid, Box, Collapse, Button, BoxProps, LinkBox, LinkOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react"
import CardApp from "./CardApp";
import CardGadget from "./CardGadget";


export default function Now({ goOpen, goClose, getDisclosureProps}: Boolean) {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Box>
      <Collapse in={isOpen || goOpen} animateOpacity >
      <SimpleGrid columns={2} spacing={4} mb="8" >
        <Music />
        <Books />
        <Box gridColumn="span 2" position="relative">
          <Box bgGradient="linear(to-b, rgba(196,196,196,0) 0%, background 80%)" position="absolute" width="100%" height="100%" zIndex="100" hidden={isOpen || goOpen}>
          <LinkBox textAlign="center" position="absolute" bottom="10%"  left="45%" transition="all .5s ease-in-out" cursor="pointer" _hover={{ textDecoration: "underline"}}><LinkOverlay onClick={onToggle}><Text my="2">Show more ↓</Text></LinkOverlay></LinkBox>
          </Box>
          <Films />
        </Box>
      </SimpleGrid>
      <Collapse in={isOpen || goOpen} animateOpacity >
        <SimpleGrid columns={2} spacing={4} mb="8" >
          <CardApp/>
          <CardGadget/>
        </SimpleGrid>
      </Collapse>
      </Collapse>
    </Box>
  )
}