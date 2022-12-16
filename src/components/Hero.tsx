import { Flex, FlexProps, Heading } from "@chakra-ui/react"
interface Props extends FlexProps {
  title?: string
}
export const Hero = (props: Props) => {
  const { title } = props
  return (
    <Flex
      // justifyContent="center"
      // alignItems="center"
      // height="100%"
      bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
      bgClip="text"
      mb={10}
      // m='6vw'
      {...props}
    >
      {/* <Heading fontSize="6vw">{title}</Heading> */}
      <Heading as="h1" textAlign={"center"}>
        {title}
      </Heading>
    </Flex>
  )
}

Hero.defaultProps = {
  title: "Phil Bassham",
}
