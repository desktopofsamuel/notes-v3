import Layout from "@/components/Layout";
import React from "react";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { marked } from "marked";
import {
  Text,
  Grid,
  Fade,
  Tooltip,
  Box,
  Button,
  useColorModeValue,
  Flex,
  Heading,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Wrap,
  VStack,
} from "@chakra-ui/react";
import NextLink from "@/components/NextLink";
import Image from "next/image";

type Props = [
  fields: {
    Name: string;
    DescriptionTC: string;
  }
];

export default function UsesPage() {
  const { data: appsData } = useSWR<Props>("/api/apps", fetcher);
  const { data: gadgetsData } = useSWR<Props>("/api/gadgets", fetcher);

  return (
    <Layout>
      <Heading>我的 Setup</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Hardware</Tab>
          <Tab>Apps</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {!gadgetsData ? (
              <Text>Loading...</Text>
            ) : (
              <Grid gap="4">
                {gadgetsData.map((item: any, i: number) => (
                  <Box
                    key={i}
                    p="4"
                    border="1px solid"
                    borderColor="border"
                    gridTemplateColumns="max-content auto"
                    gridGap="8"
                    borderRadius="md"
                  >
                    <Box>
                      <Heading fontSize="xl" my="0" lineHeight="short">
                        {item.fields["NameTC"]}
                      </Heading>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: marked(item.fields["DescriptionTC"]),
                        }}
                      />
                      {item.fields["ExtraLink"] && (
                        <Button>
                          <NextLink href={item.fields["ExtraLink"]}>
                            {item.fields["CTA"]}
                          </NextLink>
                        </Button>
                      )}
                    </Box>
                  </Box>
                ))}
              </Grid>
            )}
          </TabPanel>
          <TabPanel>
            {console.log(gadgetsData)}
            {!appsData ? (
              <Text>Loading...</Text>
            ) : (
              <Grid gap="4">
                {appsData.map((item: any, i: number) => (
                  <Grid
                    key={i}
                    p="4"
                    border="1px solid"
                    borderColor="gray.200"
                    gridTemplateColumns="max-content auto"
                    gridGap="8"
                    borderRadius="md"
                  >
                    {item.fields["Image"] && (
                      <Box
                        backgroundColor="indigo.200"
                        borderRadius="lg"
                        display="grid"
                        placeContent="center"
                        p="4"
                        height="80px"
                        width="80px"
                        position="relative"
                        shadow="md"
                      >
                        <Image
                          src={item.fields["Image"][0].thumbnails.large.url}
                          alt={item.fields["Name"]}
                          height="64px"
                          width="64px"
                        />
                      </Box>
                    )}
                    <Box>
                      <VStack spacing="4" alignItems="start">
                        <Heading fontSize="xl" my="0" lineHeight="short">
                          {item.fields["Name"]}
                        </Heading>
                        {/* <Box
                        dangerouslySetInnerHTML={{
                          __html: marked(item.fields["DescriptionTC"]),
                        }}
                      /> */}
                        {item.fields["ExtraLink"] && (
                          <Button>
                            <NextLink href={item.fields["ExtraLink"]}>
                              {item.fields["CTATC"]}
                            </NextLink>
                          </Button>
                        )}
                      </VStack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
