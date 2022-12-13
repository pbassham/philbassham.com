import { Link as ChakraLink, Text, Code, List, ListIcon, ListItem, Divider, Box, Image, Container, Badge, Stack } from "@chakra-ui/react"
import { motion } from "framer-motion"
// import Image from "next/image"

import Link from "next/link"
import { PostType } from "types"
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
          if (post.slug === "about") return
          return (
            <Link href={`posts/${post.slug}`}>
              <Box pt={8} role="group">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
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
                    fontSize={"xl"}
                    cursor={"pointer"}
                    fontWeight="bold"
                    fontFamily={"mono"}
                    pt={10}
                    _groupHover={{ fontWeight: "semibold", color: "pink.500" }}
                  >
                    {post.title}
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
                      {post.subTitle}
                    </Text>
                    <Box>
                      {post.tags?.map((tag) => {
                        return (
                          <Badge variant="outline" colorScheme="purple">
                            {tag}
                          </Badge>
                        )
                      })}
                    </Box>
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
                    {post.excerpt}
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
