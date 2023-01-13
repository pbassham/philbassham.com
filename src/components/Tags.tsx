// import Avatar from "./avatar"
// import PostTitle from "./PostTitle"
import { Label } from "../types"
import { Badge, BadgeProps, Wrap, WrapProps } from "@chakra-ui/react"
import Link from "next/link"
import config from "@root/githubCMS.config"

interface TagsProps extends WrapProps {
  tags: Label[] // string[]
  badgeProps?: BadgeProps
}

const Tags = (props: TagsProps) => {
  const { tags, badgeProps } = props
  return (
    <Wrap {...props}>
      {tags?.map((tag) => {
        if (config.HIDE_TAGS.includes(tag.name)) return null
        return <Tag tag={tag} key={tag.id} badgeProps={badgeProps} />
      })}
    </Wrap>
  )
}

export default Tags

const Tag = (props: { tag: Label; badgeProps?: BadgeProps }) => {
  const { tag } = props
  const slug = encodeURIComponent(tag.name)
  return (
    <Link href={`/${slug}`} legacyBehavior>
      <Badge variant="outline" colorScheme="purple" cursor={"pointer"} key={tag.name} mr={2} {...props.badgeProps}>
        #{tag.name}
      </Badge>
    </Link>
  )
}
