import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "@/components/Layout"
import { Heading, Text } from "@chakra-ui/react"

const HomePage: NextPage = () => {
  return (
    <Layout title="Create Next App">
      <Heading>Desktop of Samuel</Heading>
      <Text> Hello from the otherside.</Text>
    </Layout>
  )
}

export default HomePage
