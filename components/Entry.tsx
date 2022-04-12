import dayjs from "dayjs";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  SimpleGrid,
  Grid,
  Wrap,
  Flex,
  ListItem,
} from "@chakra-ui/react";
import NextLink from "@/components/NextLink";

const Entry = ({
  title,
  date,
  commit,
  description,
  image,
  link,
  label,
}: any) => {
  return (
    <ListItem>
      <Box>
        <Grid
          gap={{ base: "2", md: "8" }}
          // alignItems="stretch"
          gridTemplateColumns={{ base: "1fr", md: "max-content 1fr" }}
        >
          <Text
            as="time"
            fontFamily="mono"
            mt="1px"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {dayjs(date).format(`YYYY-MM-DD`)}
          </Text>{" "}
          <Box>
            <Heading fontSize="lg" variant="title">
              {title}
            </Heading>
            <Box m="0" dangerouslySetInnerHTML={{ __html: description }}></Box>
            <NextLink
              href={`https://github.com/desktopofsamuel/notes-v2/commit/${commit}`}
              title="View Commit on Github"
              target="_blank"
            >
              <Text fontFamily="mono" color="gray.500">
                {commit.substring(0, 6)}
              </Text>
            </NextLink>
          </Box>
        </Grid>
      </Box>
    </ListItem>
  );
};

export default Entry;
