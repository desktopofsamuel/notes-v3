import Head from "next/head";
import Link from "next/link";
import { Container, Grid, Box } from "@chakra-ui/react";
import Nav from "@/components/Nav";
import { NextSeo } from "next-seo";
import FooterNav from "@/components/FooterNav";
import { LOCALE } from "config";

export default function Layout({
  title,
  keywords,
  description,
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <html lang={LOCALE} />
      </Head>
      <NextSeo
        title={title}
        description={description}
        // additionalMetaTags={[
        //   {
        //     property: "keywords",
        //     content: keywords,
        //   },
        // ]}
      />
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
        <FooterNav />
      </Container>
    </>
  );
}

type LayoutProps = {
  title?: string;
  description?: string;
  keywords?: [string];
  children: React.ReactNode;
};
