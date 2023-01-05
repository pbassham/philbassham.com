// import Avatar from "./avatar"
import DateFormatter from "@components/DateFormatter"
import CoverImage from "@components/CoverImage"
// import PostTitle from "./PostTitle"
import { Author, PostType } from "../types"
import { Avatar, Badge, Box, Heading } from "@chakra-ui/react"
import Link from "next/link"
import meta from "@root/config/meta.json"

export type TagsProps = {
  tags: string[]
}

const Tags = ({ tags }: TagsProps) => {
  const tagsObj = meta.tags.filter((tag) => tags?.includes(tag.slug))
  return (
    <Box>
      {tagsObj?.map((tag) => {
        return (
          <Link href={`/tag/${tag.slug}`}>
            <Badge variant="outline" colorScheme="purple" key={tag.slug} mr={2}>
              {tag.name}
            </Badge>
          </Link>
        )
      })}
    </Box>
  )
}

export default Tags