// import markdownStyles from "./markdown-styles.module.css"

import { Prose } from "@nikolovlazar/chakra-ui-prose"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { MDXComponents } from "./MDXComponents"

type Props = {
  content: MDXRemoteSerializeResult
}

const PostBody = ({ content }: Props) => {
  return <MDXRemote {...content} components={MDXComponents}/>
  // return (
  //   <Prose>
  //     <div className={"markdown"} dangerouslySetInnerHTML={{ __html: content }} />
  //   </Prose>
  // )
}

export default PostBody
