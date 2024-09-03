// import "normalize.css"
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
// import "../../public/styles/global.css"
import type { ReactElement } from "react"
import {
  chakra,
  Text,
  Box,
  Divider,
  Heading,
  ListItem,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  UnorderedList,
  OrderedList,
  AspectRatio,
  Link,
  TableCellProps,
  TableColumnHeaderProps,
  useColorModeValue as mode,
  HeadingProps,
  Image,
  Code,
  TableCaption,
} from "@chakra-ui/react"
import { NextChakraLink } from "@components/NextChakraLink"
import NextLink from "next/link"
// start
import { HTMLChakraProps } from "@chakra-ui/system"
import Summary from "./Summary"
import { Hero } from "./Hero"
// import NextImage from "next/image"

const Hr = () => {
  const borderColor = mode("gray.200", "gray.600")
  return <Divider borderColor={borderColor} my={4} w="100%" />
}

const InlineCode = (props) => {
  const colorScheme = mode("gray", "pink")
  return <Code colorScheme={colorScheme} {...props} />
}

const Blockquote = (props: HTMLChakraProps<"blockquote">) => (
  <chakra.blockquote
    p={6}
    mx={2}
    position="relative"
    _before={{
      content: "'“'",
      position: "absolute",
      left: 1,
      top: 3,
      fontSize: "4xl",
    }}
    _after={{
      content: "'”'",
      position: "absolute",
      right: 1,
      bottom: 3,
      fontSize: "4xl",
    }}
    {...props}
  />
)

const H = (props: HeadingProps) => (
  <Heading
    sx={{
      "&": {
        scrollMarginTop: "5.5rem",
      },
      "&:hover > a": {
        visibility: "visible",
      },
      "& a": {
        position: "absolute",
        marginLeft: "-1em",
        paddingRight: "0.5em",
        cursor: "pointer",
        visibility: "hidden",
        width: "80%",
        maxWidth: "800px",
        color: "gray.700",
      },
      "& a:hover": {
        visibility: "visible",
        textDecoration: "none",
      },
      "& a span:after": {
        content: '"#"',
      },
    }}
    {...props}
  />
)

const Embed = (props: { src: string }) => (
  <AspectRatio>
    <iframe src={props.src} {...props} />
  </AspectRatio>
)

const Intro = (props) => {
  const { color = "orange" } = props
  const bg = {
    orange: mode("orange.100", "orange.200"),
    green: mode("green.100", "green.200"),
  }
  return (
    <Box
      bg={bg[color]}
      boxShadow="sm"
      borderRadius={10}
      border={"1px"}
      borderColor="blackAlpha.100"
      p={4}
      my={5}
      color={mode("black", "black")}
      // fontSize="2xl"
    >
      {props.children}
    </Box>
  )
}
// import { Image, chakra  } from '@chakra-ui/react';
// export const ChakraNextImage = (props) => {
//   const { src, alt, ...rest } = props
//   return (
//     <Box position="relative" {...rest}>
//       <NextImage
//         objectFit="cover"
//         // layout="fill"
//         fill
//         src={src}
//         alt={alt}
//       />
//     </Box>
//   )
// }

export const MDXComponents: import("mdx/types").MDXComponents | undefined = {
  h1: (props: HeadingProps): ReactElement => <H as="h1" size="xl" my="1.25rem" {...props} />,
  h2: (props: HeadingProps): ReactElement => <H as="h2" size="xl" my="1.5rem" {...props} />,
  h3: (props: HeadingProps): ReactElement => <H as="h3" size="lg" my="3rem" {...props} />,
  h4: (props: HeadingProps): ReactElement => <H as="h4" size="lg" my="3rem" {...props} />,
  p: (props): ReactElement => (
    <Text
      as="p"
      lineHeight="1.6"
      my="1.25rem"
      // px={10}
      {...props}
    />
  ),
  // a: (props): ReactElement => <StylishLink {...props} />,
  a: (props): ReactElement => <NextChakraLink href={props?.href} {...props} />,
  ul: (props): ReactElement => <UnorderedList pl={4} {...props} />,
  ol: (props): ReactElement => <OrderedList pl={4} {...props} />,
  li: (props): ReactElement => <ListItem pt={4} {...props} />,
  table: (props): ReactElement => <Table {...props} />,
  thead: (props): ReactElement => <Thead {...props} />,
  tbody: (props): ReactElement => <Tbody {...props} />,
  tfoot: (props): ReactElement => <Tfoot {...props} />,
  tr: (props): ReactElement => <Tr {...props} />,
  th: (props: TableColumnHeaderProps): ReactElement => {
    return <Th isNumeric={props.align && props.align == "right"} {...props} />
  },
  td: (props: TableCellProps): ReactElement => {
    return <Td isNumeric={props.align && props.align == "right"} {...props} />
  },
  caption: (props): ReactElement => <TableCaption {...props} />,
  hr: Hr,
  inlineCode: (props): ReactElement => <InlineCode {...props} />,
  blockquote: Blockquote,
  img: (props): ReactElement => (
    <Image
      ml={"-50vw"}
      borderRadius="xl"
      left="48vw"
      // right='50vw'
      position={"relative"}
      // mr={'-50vw'}
      // w='5xl'
      // w={'4xl'}
      // maxW={'5xl'}
      // maxW={'container.sm'}
      {...props}
    />
  ),
  // Small,
  // SideNote,
  // Asterisk,
  //   TagPostList,
  //   TagPageList,
  //   PagesTagged,
  //   Categories,
  Embed,
  Intro,
  Summary,
  Hero,
  //   TwitterTweetEmbed,
  //   TwitterTimelineEmbed
}
// end
const CustomHeading = ({ as, id, ...props }) => {
  if (id) {
    return (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as={as}
            // display="inline"
            display="flex"
            id={id}
            lineHeight={"1em"}
            {...props}
            _hover={{
              _before: {
                content: '"#"',
                position: "relative",
                marginLeft: "-1.2ch",
                paddingRight: "0.2ch",
              },
            }}
          />
        </NextLink>
      </Link>
    )
  }
  return <Heading as={as} {...props} />
}
