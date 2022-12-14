import { Flex, FlexProps, HStack, Spacer, StackProps, Text } from "@chakra-ui/react"
// import { motion } from "framer-motion"
import Link from "next/link"
import { DarkModeSwitch } from "./DarkModeSwitch"

const links = [
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "About",
    url: "/about",
  },
]
const Header = (props: StackProps) => (
  <HStack as="header" w="100%" maxWidth="5xl" px="1rem" py="2rem" {...props}>
    <Link href={"/"}>
      <Text fontWeight={"bold"} fontSize="lg" fontStyle="" fontFamily={"mono"} cursor="pointer">
        Philip Bassham
      </Text>
    </Link>
    <Spacer />
    <HStack className="nav" spacing={5} pl={-1}>
      {links.map((link) => {
        return (
          <Link href={link.url} key={link.url}>
            <Text  fontFamily={"mono"} fontSize="sm" cursor={"pointer"} _hover={{ fontWeight: "semibold", color: "pink.500" }}>
              {link.title}
            </Text>
          </Link>
        )
      })}

    <DarkModeSwitch />
    </HStack>
  </HStack>
)
export default Header
