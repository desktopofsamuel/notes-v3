import NextLink from "@/components/NextLink";
import Image from "next/image";
import {
  Button,
  Box,
  Flex,
  Grid,
  Heading,
  VStack,
  Image as ChakraImage,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
  IconButton,
  UnorderedList,
  ListItem,
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
import { MENU, BIO } from "@/config/index";

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
    >
      <Flex direction="column">
        <NextLink href="/" passHref variant="noeffect">
          <ChakraImage
            src="/profile.jpg"
            width={100}
            height={100}
            alt="logo"
            borderRadius="50%"
          />
        </NextLink>

        <NextLink href="/" passHref variant="noeffect">
          <Heading fontSize="medium" mt="4">
            Samuel W.
          </Heading>
        </NextLink>
        <Box dangerouslySetInnerHTML={{ __html: BIO }} />
      </Flex>
      {/* Menu */}
      <VStack
        gap={{ base: "2", md: "8" }}
        alignItems={{ base: "flex-end", md: "flex-start" }}
      >
        <UnorderedList spacing="2" marginInlineStart="0" mb="8">
          {MENU.map((item) => (
            <ListItem key={item.path} listStyleType="none">
              <NextLink href={item.path} variant="navigation">
                {item.label}
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>

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
            href="https://follow.it/desktop-of-samuel?action=followPub"
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
