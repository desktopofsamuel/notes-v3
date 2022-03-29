import Layout from '@/components/Layout'
import React from 'react'
import fetcher from '@/lib/fetcher';
import useSWR from "swr";
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
} from "@chakra-ui/react";
import NextLink from '@/components/NextLink';
import Image from 'next/image';


export default function UsesPage() {
  const {data:  appsData } = useSWR("/api/apps", fetcher);
  const { data: gadgetsData } = useSWR("/api/gadgets", fetcher);

  return (
    <Layout>
      <Heading>我的Setup</Heading>
      <Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab>Hardware</Tab>
    <Tab>Apps</Tab>
  </TabList>
  <TabPanels>
  <TabPanel>
  {!gadgetsData ? (<Text>Loading...</Text>):
        (gadgetsData.map((item: any, i: number) => (
          <Box key={i} p="2" border="1px solid" borderColor="gray.200" gridTemplateColumns="max-content auto" gridGap="8">
            <Box>
            <Heading fontSize="xl" my="0" lineHeight="short">{item.fields["Name"]}</Heading>
            <Text fontSize="sm">{item.fields["DescriptionTC"]}</Text>
            {item.fields["ExtraLink"] && <Button><NextLink href={item.fields["ExtraLink"]}>{item.fields["CTA"]}</NextLink></Button>}
            </Box>
          </Box>
        )))
      }
    </TabPanel>
    <TabPanel>
      {console.log(gadgetsData)}
      {!appsData ? (<Text>Loading...</Text>):
        (appsData.map((item: any, i: number) => (
          <Grid key={i} p="2" border="1px solid" borderColor="gray.200" gridTemplateColumns="max-content auto" gridGap="8">
            {item.fields["Image"] && 
            <Box backgroundColor="indigo.200" borderRadius="36px" display="grid" placeContent="center" p="4" height="128px" width="128px" position="relative" >
              <Image src={item.fields["Image"][0].thumbnails.large.url} alt={item.fields["Name"]} height="64px" width="64px"/>
            </Box>
            }
            <Box>
            <Heading fontSize="xl" my="0" lineHeight="short">{item.fields["Name"]}</Heading>
            <Text fontSize="sm">{item.fields["DescriptionTC"]}</Text>
            {item.fields["ExtraLink"] && <Button><NextLink href={item.fields["ExtraLink"]}>{item.fields["CTA"]}</NextLink></Button>}
            </Box>
          </Grid>
        )))
      }
    </TabPanel>
  </TabPanels>
</Tabs>
     

    </Layout>
  )
}
