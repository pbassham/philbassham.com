import { Box, Container, Text, VStack } from "@chakra-ui/react"
// import Container from "@components/Container"
import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
// import { getContent } from "@lib/api"

const Summary = (props) => {
  const { children } = props
  return (
    <VStack {...props}>
      <Container maxW={"90%"} px={0}>
        <Text  fontSize='xl' fontFamily={"mono"}>
          {children}
        </Text>
      </Container>
    </VStack>
  )
}

export default Summary
