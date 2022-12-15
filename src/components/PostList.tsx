import { Link as ChakraLink, Text, Code, List, ListIcon, ListItem, Divider, Box, Image, Container, Badge, Stack } from "@chakra-ui/react"
import { motion } from "framer-motion"
// import Image from "next/image"

import Link from "next/link"
import { PostType } from "types"
import Tags from "./Tags"
// import philipSmall from '../../public/assets/philip-small.jpeg'
// import philipSmall from "@assets/philip-small.jpeg"

const PostList = (props: { allPosts: PostType[] }) => {
  const { allPosts } = props
  //   const heroPost = allPosts[0]
  //   const morePosts = allPosts.slice(1)
  const morePosts = allPosts

  return (
    <>
      {/* {heroPost && <Text fontWeight={"bold"}>{heroPost.title}</Text>} */}
      {morePosts?.length > 0 &&
        morePosts.map((post: PostType) => {
          const { slug, category, coverImage, tags, title, subTitle, excerpt } = post
          // if (post.slug === "about") return
          return (
            <Link href={`/${category || "posts"}/${slug}`} key={slug}>
              <Box pt={8} role="group">
                {coverImage && (
                  <Image
                    src={coverImage}
                    borderRadius={"md"}
                    cursor="pointer"
                    as={motion.img}
                    whileHover={{ scale: 1.01 }}
                    boxShadow="xl"
                    //   whileTap={{ scale: 0.97 }}
                  />
                )}
                <Container maxW={"90%"}>
                  <Text
                    fontSize={"2xl"}
                    cursor={"pointer"}
                    fontWeight="bold"
                    fontFamily={"mono"}
                    pt={10}
                    _groupHover={{ fontWeight: "semibold", color: "pink.500" }}
                  >
                    {title}
                  </Text>
                  <Stack direction="row">
                    <Text
                      // fontSize={""}
                      as="em"
                      cursor={"pointer"}
                      //   fontWeight="bold"
                      // fontFamily={"mono"}
                      // fontStyle='italic'
                      //   py={10}
                      _groupHover={{ color: "pink.500" }}
                    >
                      {subTitle}
                    </Text>
                    <Tags tags={tags} />
                  </Stack>
                  <Text
                    //   fontSize={""}
                    cursor={"pointer"}
                    //   fontWeight="bold"
                    //   fontFamily={"mono"}
                    pt={3}
                    pb={10}
                    //   _groupHover={{  color: "pink.500" }}
                  >
                    {excerpt}
                  </Text>
                  <Divider />
                </Container>
              </Box>
            </Link>
          )
        })}
    </>
  )
}
export default PostList
