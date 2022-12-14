// import Avatar from "./avatar"
import DateFormatter from "@components/DateFormatter"
import CoverImage from "@components/CoverImage"
// import PostTitle from "./PostTitle"
import { Author, PostType } from "../types"
import { Avatar, Badge, Box, Heading } from "@chakra-ui/react"
import Link from "next/link"

const PostHeader = ({ title, subTitle, coverImage, date, author, tags }: PostType) => {
  return (
    <>
      <Heading as="h1" textAlign={"center"} pb={3} fontFamily="mono">
        {title}
      </Heading>
      <Heading as="h3" fontSize={"xl"} textAlign={"center"} pb={10} fontFamily="mono">
        {subTitle}
      </Heading>
      <Box>
        {tags?.map((tag) => {
          return (
            <Link href={`/tag/${tag}`}>
              <Badge variant="outline" colorScheme="purple" key={tag} mr={2}>
                {tag}
              </Badge>
            </Link>
          )
        })}
      </Box>
      {/* <PostTitle>{title}</PostTitle> */}
      {/* <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} src={author.picture} />
      </div> */}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      {/* <div className="max-w-2xl mx-auto"> */}
      {/* <div className="block md:hidden mb-6">
          <Avatar name={author.name} src={author.picture} />
        </div> */}
      {/* <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div> */}
      {/* </div> */}
    </>
  )
}

export default PostHeader
