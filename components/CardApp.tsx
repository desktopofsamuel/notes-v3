import React from "react";
import fetcher from "../lib/fetcher";
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

type Props = [
  fields: {
    Name: string;
    DescriptionTC: string;
  }
];

export default function CardApp() {
  const { data, error } = useSWR<Props>("/api/apps", fetcher);
  return (
    <>
      <Box
        backgroundColor={useColorModeValue("gray.50", "gray.700")}
        boxShadow="xs"
        p="4"
        borderRadius="16"
        gridColumn={{ base: "span 2", md: "initial" }}
      >
        <Text variant="small">📚 我的App</Text>
        {!data ? (
          <Box height={200} width="100%"></Box>
        ) : (
          data.slice(0, 4).map((item: any, i: number) => (
            <Box key={i}>
              <Text my="0" lineHeight="short">
                {item.fields["Name"]}
              </Text>
              <Text fontSize="sm" noOfLines={2}>
                {item.fields["DescriptionTC"]}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </>
  );
}
