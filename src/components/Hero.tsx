import { Flex, Heading } from "@chakra-ui/react"
type Props = {
  title?: string;
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
      mb={14}
      // m='6vw'
    >
      {/* <Heading fontSize="6vw">{title}</Heading> */}
      <Heading as="h2">
        {title}
      </Heading>
    </Flex>
  )
}

Hero.defaultProps = {
  title: "Phil Bassham",
}
