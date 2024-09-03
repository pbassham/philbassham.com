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
          // console.log("post", post)
          return (
            // <Link href={`/${category || "posts"}/${slug}`} key={slug}>
            <Link href={`/${slug}`} key={slug}>
              <Box pt={0} role="group">
                
                <Container maxW={"90%"} px={0} py={5}>
                  <Text
                    fontSize={"2xl"}
                    cursor={"pointer"}
                    fontWeight="bold"
                    fontFamily={"mono"}
                    // pt={10}
                    _groupHover={{ fontWeight: "semibold", color: "pink.500" }}
                  >
                    {title}
                  </Text>
                  <Stack 
                  // direction="row"
                  
                  >
                    <Text
                      // fontSize={""}
                      as="em"
                      cursor={"pointer"}
                      //   fontWeight="bold"
                      // fontFamily={"mono"}
                      // fontStyle='italic'
                        // pb={10}
                      _groupHover={{ color: "pink.500" }}
                    >
                      {subTitle}
                    </Text>
                    <Tags tags={tags} />
                  </Stack>
                  
                  
                </Container>
                {coverImage && (
                  <Image
                    src={coverImage}
                    borderRadius={"md"}
                    cursor="pointer"
                    as={motion.img}
                    whileHover={{ scale: 1.01 }}
                    boxShadow="xl"
                    paddingY={5}
                    //   whileTap={{ scale: 0.97 }}
                  />
                )}
                {excerpt && (
                  <Container maxW={"90%"} px={0}>
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
                  </Container>
                )}
                <Divider py={5} />
              </Box>
             </Link>
          )
        })}
    </>
  )
}
export default PostList
