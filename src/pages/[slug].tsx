import { getBySlug, getContent } from "@lib/api"
import markdownToHtml from "@lib/markdownToHtml"
import Post from "@components/Post"
import { Params } from "types"
import { serialize } from "next-mdx-remote/serialize"

export default Post

export async function getStaticProps({ params }: Params) {
  const post = getBySlug("pages", params.slug)

  // const content = await markdownToHtml(post.content || "")
  const content = await serialize(post.content)

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
  const pages = getContent("pages")

  return {
    paths: pages.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
