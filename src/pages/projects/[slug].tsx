import { getBySlug, getContent } from "@lib/api"
import markdownToHtml from "@lib/markdownToHtml"
import { Params, PostType } from "../../types"
import Post from "@components/Post"

export default Post

export async function getStaticProps({ params }: Params) {
  const post = getBySlug("posts", params.slug)
  const content = await markdownToHtml(post.content || "")

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getContent("posts")
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
