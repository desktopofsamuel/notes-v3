import NextLink from "@/components/NextLink";
import { IconButton } from "@chakra-ui/react";

type SocialIconType = {
  href: string;
  children: any;
  label: string;
};

const SocialIcon: React.FC<SocialIconType> = ({ children, href, label }) => (
  <NextLink variant="noeffect" href={href} target="_blank">
    <IconButton
      width="4"
      variant="outline"
      isRound
      colorScheme="gray"
      borderColor="gray.200"
      transition="ease-in-out"
      icon={children}
      aria-label={label}
    />
  </NextLink>
);

export default SocialIcon;
