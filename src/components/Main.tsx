import { Container, Stack, StackProps } from "@chakra-ui/react"

export const Main = (props: StackProps) => (
  <Container maxW='4xl' centerContent>
    <Stack
      spacing="1.5rem"
      width="100%"
      // maxWidth="60rem"
      // mt="-45vh"
      pt="3rem"
      px="1rem"
      {...props}
      />
      {/* {props.children} */}
  </Container>
)
