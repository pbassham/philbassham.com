import { Center, Divider, Flex, FlexProps } from "@chakra-ui/react"
import { ButtonGroup, Container, IconButton, Stack, Text } from "@chakra-ui/react"
import * as React from "react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
// import { Logo } from './Logo'
import config from "@root/config/config.json"

export const Footer = (props: FlexProps) => (
  // <Flex as="footer" py="8rem" >

  <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
    {/* <Stack spacing={{ base: '4', md: '5' }}> */}
    {/* <Divider /> */}
    <Center>
      {/* <Logo /> */}
      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href={`https://www.linkedin.com/in/${config.linkedin_account}`}
          target={"_blank"}
          aria-label="LinkedIn"
          _hover={{
            background: "whiteAlpha.100",
            color: "blue.500",
          }}
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton as="a" href={`https://github.com/${config.github_account}`} target="_blank" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        <IconButton
          as="a"
          href={`https://x.com/${config.twitter_account}`}
          target="_blank"
          aria-label="X"
          _hover={{
            background: "whiteAlpha.100",
            color: "blue.300",
          }}
          icon={<FaTwitter fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Center>
    {/* <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Philip Bassham. All rights reserved.
      </Text> */}
    {/* </Stack> */}
  </Container>
)
// </Flex>
// )
