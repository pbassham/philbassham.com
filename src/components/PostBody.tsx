// import markdownStyles from "./markdown-styles.module.css"

import { Box } from "@chakra-ui/react"
import { Prose } from "@nikolovlazar/chakra-ui-prose"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { MDXComponents } from "./MDXComponents"

type Props = {
  content: MDXRemoteSerializeResult
}

const PostBody = ({ content }: Props) => {
  return (
    <Box mx={[0, null, 10]}>
      <MDXRemote {...content} components={MDXComponents} />
    </Box>
  )
}

export default PostBody
