import React from 'react'
import fetcher from '../lib/fetcher';
import useSWR from "swr";
import {
  Text,
  Grid,
  Tooltip,
  Box,
  useColorModeValue,
  Flex,
  Wrap,
} from "@chakra-ui/react";


export default function CardGadget() {
  const { data, error } = useSWR<any>("/api/gadgets", fetcher);
  return (
    <>
      <Box
        backgroundColor={useColorModeValue("gray.50", "gray.700")}
        boxShadow="xs"
        p="4"
        borderRadius="16"
        gridColumn={{ base: "span 2", md: "initial" }}
      >
        <Text variant="small">📚 我的Setup</Text>
        {!data ? (
            <Box height={200} width="100%"></Box>
          ) : (
            data.slice(0, 4).map((item: any, i: number) => (
              <Box key={i}>
                {console.log(item)}
                <Text my="0" lineHeight="short">{item.fields["Name"]}</Text>
                <Text fontSize="sm" noOfLines={2}>{item.fields["DescriptionTC"]}</Text>
              </Box>
            ))
          )
        }
      </Box>
    </>
  )
}