import Link from "next/link";
import Image from "next/Image";
import {
  Button,
  Box,
  Flex,
  Grid,
  Heading,
  VStack,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaInstagram,
  FaFigma,
  FaRss,
  FaEnvelope,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import SocialIcon from "@/components/SocialIcon";
import { menu } from "@/config/menu";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Grid
      as="aside"
      alignContent="flex-start"
      gap="10"
      gridTemplateColumns={{ base: "auto auto", md: "auto" }}
      mb={{ base: "8", md: "0" }}
      position={{ base: "initial", md: "sticky" }}
      top={{ base: "0", md: "4" }}
      height={{ base: "initial", md: "100px" }}
    >
      <Flex direction="column">
        <Image
          src="/profile"
          width={100}
          height={100}
          alt="Profile photo of Samuel W."
        />
        <Link href="/" passHref>
          <Heading as="h1" fontSize="medium" mt="4">
            Samuel W.
          </Heading>
        </Link>
      </Flex>
      {/* Menu */}
      <VStack
        as="ul"
        spacing="2"
        alignItems={{ base: "flex-end", md: "flex-start" }}
      >
        <VStack spacing="2" alignItems={{ base: "flex-end", md: "flex-start" }}>
          {menu.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}{" "}
        </VStack>
        {/* Social Icons */}
        <SimpleGrid
          spacingX="4"
          spacingY="2"
          columns={3}
          display={{ base: "none", md: "grid" }}
        >
          <SocialIcon
            href="https://twitter.com/desktopofsamuel"
            label="Link to Twitter"
          >
            <FaTwitter />
          </SocialIcon>
          <SocialIcon
            href="https://instagram.com/desktopofsamuel"
            label="Link to Instagram"
          >
            <FaInstagram />
          </SocialIcon>
          <SocialIcon
            href="https://www.figma.com/@desktopofsamuel"
            label="Link to Figma"
          >
            <FaFigma />
          </SocialIcon>
          <SocialIcon
            href="https://notes.desktopofsamuel.com/rss.xml/"
            label="Link to RSS"
          >
            <FaRss />
          </SocialIcon>
          <SocialIcon
            href="mailto:desktopofsamuel@gmail.com"
            label="Write an Email"
          >
            <FaEnvelope />
          </SocialIcon>
        </SimpleGrid>
        <IconButton
          width="4"
          aria-label="Switch Color Mode"
          variant="solid"
          colorScheme="gray"
          onClick={toggleColorMode}
          isRound
          icon={colorMode === `light` ? <FaMoon /> : <FaSun />}
        />
      </VStack>
    </Grid>
  );
}
