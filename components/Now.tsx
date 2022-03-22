import Films from "@/components/Films";
import Books from "@/components/Books";
import Music from "@/components/Music";
import { SimpleGrid } from "@chakra-ui/react";
import CardApp from "./CardApp";
import CardGadget from "./CardGadget";

export default function Now() {
  return (
    <>
      <SimpleGrid columns={2} spacing={4} mb="8">
        <Music />
        <Books />
        <Films />
        <CardApp/>
        <CardGadget/>
      </SimpleGrid>
    </>
  );
}
