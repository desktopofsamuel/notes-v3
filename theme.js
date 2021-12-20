import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
  config: {
    cssVarPrefix: "dos",
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    body: "Serif",
    heading: "Serif",
    mono: "Space Mono, IBM Plex Mono, monospace",
  },
});

export default customTheme;
