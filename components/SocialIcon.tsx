import Link from "next/link";
import { IconButton } from "@chakra-ui/react";

type SocialIconType = {
  href: string;
  children: any;
  label: string;
};

const SocialIcon: React.FC<SocialIconType> = ({ children, href, label }) => (
  <Link href={href} passHref>
    <IconButton
      as="a"
      width="4"
      variant="outline"
      isRound
      colorScheme="gray"
      borderColor="gray.200"
      transition="ease-in-out"
      icon={children}
      aria-label={label}
    />
  </Link>
);

export default SocialIcon;
