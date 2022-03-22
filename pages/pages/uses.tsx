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
  const { data, error } = useSWR("/api/apps", fetcher);

  return (
    <Layout>
      <Heading>我的</Heading>
      <Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab>Apps</Tab>
    <Tab>Hardware</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
  
    
      {!data ? (<Text>Loading...</Text>):
        (data.map((item: any, i: Number) => (
          <Grid key={i} p="2" border="1px solid" borderColor="gray.200" gridTemplateColumns="max-content auto" gridGap="8">
            {item.fields["Image"] && 
            <Box backgroundColor="indigo.200" borderRadius="36px" display="inline-block" p="4" height="128px" width="128px" position="relative" >
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
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
     

    </Layout>
  )
}
