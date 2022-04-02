import React from 'react'
import Link from "next/link";
import Layout from '@/components/Layout'
import { Heading, Text, Box, Button, VStack, SimpleGrid } from "@chakra-ui/react"
import Resources from "../../content/resources.json"
import Image from 'next/image';

type ResourcesTypes = {
  name: string,
  description: string,
  cta: string,
  url: string,
  image: string,
}

export default function ResourcesPage() {
  return (
    <Layout>
        <Heading>Tools & Resources</Heading>
        <Text>UX Design Career Kit. My list of favorite and helpful resources for job hunting. Helpful tips from Twitter's design leaders are included!</Text>
        <VStack gap="4">
        {Resources.map((item: ResourcesTypes, i: number) => (
          <SimpleGrid gridTemplateColumns="40% 60%" gap="4" key={i} border="1px solid" borderColor="border" borderRadius="xl" p="4" backgroundColor="background">
            <Box position="relative"><Image src={item.image} alt={item.name} width="736" height="386"/></Box>
            <Box>
            <Heading fontSize="xl" my="2">{item.name}</Heading>
            <Text>{item.description}</Text>
            <Link href={item.url} passHref>
              <Button>{item.cta}</Button>
            </Link></Box>
          </SimpleGrid>
        ))}
        </VStack>
    </Layout>
  )
}
