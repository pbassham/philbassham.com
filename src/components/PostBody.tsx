// import markdownStyles from "./markdown-styles.module.css"

import { Prose } from "@nikolovlazar/chakra-ui-prose"

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <Prose>
      <div className={"markdown"} dangerouslySetInnerHTML={{ __html: content }} />
    </Prose>
  )
}

export default PostBody
