import { Box, Container, Text, VStack } from "@chakra-ui/react"
// import Container from "@components/Container"
import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
// import { getContent } from "@lib/api"

const Summary = (props) => {
  const { children, showCursor } = props
  return (
    <>
      <VStack {...props}>
        <Container maxW={"90%"} px={0}>
          <Text
            fontSize="xl"
            fontFamily={"mono"}
            _after={{
              width: "9px",
              content: showCursor ? '""' : 'none',
              height: "1.3rem",
              background: "#ccc",
              display: showCursor ? "inline-block" : "none",
              animation: showCursor ? "blink 1s step-start infinite" : "none",
              bottom: "-0.5",
              position: "relative",
            }}
          >
            {children}
          </Text>
        </Container>
      </VStack>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}

export default Summary
