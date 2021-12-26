import Layout from "@/components/Layout";
import Link from "next/link";
import { HStack, Heading, Text, Button } from "@chakra-ui/react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import Now from "@/components/Now";

export default function AboutPage() {
  return (
    <Layout title="關於本站" description="" keywords="">
      <Heading>關於我 About Me</Heading>
      <Text>
        帕慕克說過，真正的博物館是時間被轉化成空間的地方。若把我的人生策展成一個展覽，書桌上大概會放著一部
        MacBook、一部相機和一枝筆桿。正職是 UI/UX
        設計師，閒時愛看電影。大學時對城市研究最著迷，旅行時不忘寫下大街小巷的見聞。
      </Text>
      <HStack gap="4">
        <Link passHref href="https://twitter.com/desktopofsamuel">
          <Button leftIcon={<FaTwitter />}>我的 Twitter</Button>
        </Link>
        <Link passHref href="https://www.instagram.com/desktopofsamuel/">
          <Button leftIcon={<FaInstagram />}>我的 Instagram</Button>
        </Link>
      </HStack>
      <Now />
    </Layout>
  );
}
