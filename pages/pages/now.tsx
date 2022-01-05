import Layout from "@/components/Layout";
import Link from "next/link";
import {
  HStack,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import Now from "@/components/Now";

export default function AboutPage() {
  return (
    <Layout
      title="關於本站"
      description="帕慕克說過，真正的博物館是時間被轉化成空間的地方。若把我的人生策展成一個展覽，書桌上大概會放著一部
    MacBook、一部相機和一枝筆桿。"
    >
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
      <Heading>現在 Now</Heading>
      <Text>
        Now Page Movement 是一個外國網主發起的運動，在自己的網站開一新頁 "Now"
        ，寫下“What are you focused on now?” 的答案。在社交媒體的世代，每個
        Tweet、Status 和 Story 也在表達自己的心情和想法。Now
        把焦點放到「現在」，寫下自己在做甚麼和宏觀的目標。現時已有約 2000 人加入
        Now 到自己的網頁。
      </Text>
      <Heading>Now</Heading>
      <Alert status="info">
        <AlertIcon />
        <p>
          最近喜愛的東西已搬到<Link href="/">主頁</Link>，如何將網誌連結到
          Spotify, Letterboxd 等平台，可參考這篇
          <Link href="/posts/gatsby-個人狀況自動更新-整合spotify音樂-letterboxd電影-書本紀錄/">
            技術分享
          </Link>
        </p>
      </Alert>
    </Layout>
  );
}
