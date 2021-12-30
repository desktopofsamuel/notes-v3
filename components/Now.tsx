import Films from "@/components/Films";
import Books from "@/components/Books";
import { VStack } from "@chakra-ui/react";

export default function Now() {
  return (
    <>
      <VStack spacing="4">
        <Films />
        <Books />
      </VStack>
    </>
  );
}
