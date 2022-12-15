// import Avatar from "./avatar"
import DateFormatter from "@components/DateFormatter"
import CoverImage from "@components/CoverImage"
// import PostTitle from "./PostTitle"
import { Author, PostType } from "../types"
import { Avatar, Badge, Box, Heading, VStack } from "@chakra-ui/react"
import Link from "next/link"
import Tags from "./Tags"

const PostHeader = ({ title, subTitle, coverImage, date, author, tags }: PostType) => {
  return (
    <>
      <Heading as="h1" textAlign={"center"} pb={3} fontFamily="mono">
        {title}
      </Heading>
      <Heading as="h3" fontSize={"2xl"} textAlign={"center"} pb={10} fontFamily="mono">
        {subTitle}
      </Heading>
      <VStack pb={10}>
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
