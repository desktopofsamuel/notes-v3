import Link from "next/link";
import { Link as ChakraLink, chakra } from "@chakra-ui/react";

const CustomLink = chakra(Link);

export default function NextLink({
  children,
  href,
  passHref,
  prefetch,
  replace,
  className,
  variant,
  title,
  ...rest
}: LinkProps) {
  const internal = /^\/(?!\/)/.test(href);
  if (internal)
    return (
      <ChakraLink
        as={Link}
        href={href}
        className={className}
        variant={variant}
        passHref
        {...rest}
      >
        {children}
      </ChakraLink>
    );
  return (
    <ChakraLink
      as={Link}
      isExternal
      href={href}
      className={className}
      rel="noreferrer noopener"
      variant={variant}
      passHref
      {...rest}
    >
      {children}
    </ChakraLink>
  );
}

const defaultProps: LinkProps = {
  target: `_self`,
  className: "",
  children: null,
  href: "",
  passHref: false,
  variant: "",
  title: "",
};

type LinkProps = {
  target?: "_blank" | "_self";
  className?: string;
  children?: React.ReactNode;
  href: string;
  passHref?: boolean;
  prefetch?: boolean;
  replace?: boolean;
  variant?: string;
  title?: string;
};

NextLink.defaultProps = defaultProps;
