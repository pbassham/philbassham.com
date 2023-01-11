// import Avatar from "./avatar"
import DateFormatter from "@components/DateFormatter"
import CoverImage from "@components/CoverImage"
// import PostTitle from "./PostTitle"
import { Author, Label, PostType } from "../types"
import { Avatar, Badge, Box, Heading } from "@chakra-ui/react"
import Link from "next/link"
import meta from "@root/config/meta.json"
import { useState } from "react"

export type TagsProps = {
  tags: Label[] // string[]
}

const Tags = ({ tags }: TagsProps) => {
  // const tagsObj = meta.tags.filter((tag) => tags?.includes(tag.slug))
  return (
    <Box>
      {tags?.map((tag) => {
        // const slug = encodeURIComponent(tag.name)
        if (tag.name === "post") return null
        if (tag.name === "page") return <></> //null
        if (tag.name === "published") return <></> //null
        return <Tag tag={tag} />
        // return (
        //   // <Link href={`/tag/${tag.slug}`}>
        //   <Link href={`/${slug}`}>
        //     <Badge variant="outline" colorScheme="purple" key={tag.name} mr={2}>
        //       {tag.name}
        //     </Badge>
        //   </Link>
        // )
      })}
    </Box>
  )
}

export default Tags

const Tag = ({ tag }) => {
  // const [show, setShow] = useState(true)
  // const tagsObj = meta.tags.filter((tag) => tags?.includes(tag.slug))
  const slug = encodeURIComponent(tag.name)
  return (
    <Link href={`/${slug}`} legacyBehavior>
      <Badge variant="outline" colorScheme="purple" key={tag.name} mr={2}>
        {tag.name}
      </Badge>
    </Link>
  )

  // return (<Box>

  //   </Box>
  // )
}
