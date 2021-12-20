import Head from 'next/head'
import Link from "next/link";
import { Container } from "@chakra-ui/react"
import Nav from '@/components/Nav';

export default function Layout({ title, keywords, description, children  }: LayoutProps) {
  return (
    <div>
      <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      </Head>
      <Nav/>
      <Container as="main">
        {children}
      </Container>
    </div>
  )
}

type LayoutProps = {
  title: string,
  description: string,
  keywords: string,
  children: React.ReactNode,
}

const defaultProps: LayoutProps = {
  title: "DJ Events | Find the parties",
  description: "Find the latest DJ parties",
  keywords: "music, dj, events, parties",
  children: "",
};

Layout.defaultProps = defaultProps
