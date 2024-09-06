import { Link as ChakraLink, LinkProps as ChakraLinkProps, useColorModeValue as mode } from "@chakra-ui/react"
import { LinkProps as NextLinkProps } from "next/dist/client/link"
import NextLink from "next/link"

export type NextChakraLinkProps = NextLinkProps & Omit<ChakraLinkProps, "as">

//  Has to be a new component because both chakra and next share the `as` keyword
export const NextChakraLink = ({ href, as, replace, scroll, shallow, prefetch, ...chakraProps }: NextChakraLinkProps) => {
  return (
    <NextLink legacyBehavior passHref href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch}>
      <ChakraLink
        transition="none"
        _hover={{ textDecoration: "none" }}
        // textDecoration={"underline"}
        // borderBottom="1px dotted"
        fontWeight={"semibold"}
        // color="HighlightText"
        color={mode("gray.900", "gray.100")}
        // bg={}
        background={`linear-gradient(180deg, rgba(255,255,255,0) 65%,  ${mode('#FFD0AE','#976626')} 75%);`}
        // backgroundColor={mode("orange.100", "yellow.900")}
        {...chakraProps}
      />
    </NextLink>
  )
}
