// import Avatar from "./avatar"
import DateFormatter from "@components/DateFormatter"
import CoverImage from "@components/CoverImage"
// import PostTitle from "./PostTitle"
import { Author, PostType } from "../types"
import { Avatar, Badge, Box, Heading, VStack } from "@chakra-ui/react"
import Link from "next/link"
import Tags from "./Tags"
import { Hero } from "./Hero"

const PostHeader = ({ title, subTitle, coverImage, date, author, tags }: PostType) => {
  return (
    <>
      <VStack pb={10}>
        <Hero title={title} mb={5} />

        {/* <Heading as="h3" fontSize={"2xl"} textAlign={"center"}  fontFamily="mono">
          {subTitle}
        </Heading> */}
        <DateFormatter dateString={date} />
        <Tags tags={tags} />
      </VStack>
      <CoverImage title={title} src={coverImage} />

      {/* <PostTitle>{title}</PostTitle> */}
      {/* <Avatar name={author.name} src={author.picture} /> */}
    </>
  )
}

export default PostHeader
