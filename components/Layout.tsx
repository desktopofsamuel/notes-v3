import Head from "next/head";
import Link from "next/link";
import { Container, Grid, Box } from "@chakra-ui/react";
import Nav from "@/components/Nav";

export default function Layout({
  title,
  keywords,
  description,
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Container maxW="container.lg">
        <Grid
          gridTemplateColumns={{
            base: "100%",
            md: "200px auto",
            lg: "200px minmax(0,1px) auto",
          }}
          py="10"
          gap={{ base: "0", md: "2", lg: "10" }}
        >
          <Nav />
          <Box
            background="linear-gradient(180deg,#e1e1e1 0,#e1e1e1 48%,#fff)"
            height="33vh"
            width="1px"
            display={{ base: "none", md: "none", lg: "block" }}
          />
          <Box as="main">{children}</Box>
        </Grid>
        {/* <Footer /> */}
      </Container>
    </>
  );
}

type LayoutProps = {
  title: string;
  description: string;
  keywords: string;
  children: React.ReactNode;
};

const defaultProps: LayoutProps = {
  title: "DJ Events | Find the parties",
  description: "Find the latest DJ parties",
  keywords: "music, dj, events, parties",
  children: "",
};

Layout.defaultProps = defaultProps;
