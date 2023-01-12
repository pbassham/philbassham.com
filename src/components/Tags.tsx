// import Avatar from "./avatar"
// import PostTitle from "./PostTitle"
import { Author, Label, PostType } from "../types"
import { Avatar, Badge, Box, Heading } from "@chakra-ui/react"
import Link from "next/link"
import config from "@root/githubCMS.config"

export type TagsProps = {
  tags: Label[] // string[]
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <Box>
      {tags?.map((tag) => {
        if (config.HIDE_TAGS.includes(tag.name)) return null
        return <Tag tag={tag} key={tag.id} />
      })}
    </Box>
  )
}

export default Tags

const Tag = ({ tag }) => {
  const slug = encodeURIComponent(tag.name)
  return (
    <Link href={`/${slug}`} legacyBehavior>
      <Badge variant="outline" colorScheme="purple" key={tag.name} mr={2}>
        {tag.name}
      </Badge>
    </Link>
  )
}
