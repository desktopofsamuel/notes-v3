import Layout from "@/components/Layout";
import Link from "next/link";
import {
  HStack,
  Heading,
  Text,
  Button,
  Alert,
  Stack,
  Box,
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
      <Stack spacing="8" alignContent="flex-start">
        <Box>
          <Heading>關於我 About Me</Heading>
          <Text>
            帕慕克說過，真正的博物館是時間被轉化成空間的地方。若把我的人生策展成一個展覽，書桌上大概會放著一部
            MacBook、一部相機和一枝筆桿。正職是 UI/UX
            設計師，閒時愛看電影。大學時對城市研究最著迷，旅行時不忘寫下大街小巷的見聞。
          </Text>
          <HStack gap="4">
          <Link passHref href="https://twitter.com/desktopofsamuel">
            <Button as="div" leftIcon={<FaTwitter />}>我的 Twitter</Button>
          </Link>
          <Link passHref href="https://www.instagram.com/desktopofsamuel/">
            <Button as="div" leftIcon={<FaInstagram />}>我的 Instagram</Button>
          </Link>
        </HStack>
        </Box>
        
        <Box>
          <Heading>現在 Now</Heading>
          <Text>
            <a href="https://sive.rs/nowff" target="_blank" rel="noreferrer">Now Page Movement</a> 是一個外國網主發起的運動，在自己的網站開一新頁
            &quot;Now&quot; ，寫下“What are you focused on now?”
            的答案。在社交媒體的世代，每個 Tweet、Status 和 Story
            也在表達自己的心情和想法。Now
            把焦點放到「現在」，寫下自己在做甚麼和宏觀的目標。現時已有約 2000
            人加入 Now 到自己的網頁。
          </Text>
        </Box>
        <Box>
          <Text>來年希望繼續當個有心人，2022年希望完成的事：</Text>
         <Text>⬜️ 投放時間到設計社群當中</Text><Text>⬜️ 分享我學習 Coding 心得</Text>
          <Text>⬜️ 看20齣紀錄片</Text>
          <Text>⬜️ 閱讀12本書</Text>
          <Text>⬜️ 完成12期的 <a href="https://www.getrevue.co/profile/juxtdesigncc" target="_blank" rel="noreferrer">How Might We 設計 Newsletter</a></Text>
        
          <Alert status="info">
            <AlertIcon />
            <Text>
              2021年我已把最近喜愛的東西已搬到<Link href="/">主頁</Link>，並轉成自動更新，想知如何連結Spotify, Letterboxd 等平台，可參考這篇
              <Link href="/posts/gatsby-個人狀況自動更新-整合spotify音樂-letterboxd電影-書本紀錄/">
                技術分享
              </Link>
            </Text>
          </Alert>
        </Box>
      </Stack>
    </Layout>
  );
}
