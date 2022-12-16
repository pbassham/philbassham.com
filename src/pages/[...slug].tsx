import { getByCat, getBySlug, getContent } from "@lib/api"
import { GetStaticPaths } from "next"
import Post from "@components/Post"
import { serialize } from "next-mdx-remote/serialize"
import Category from "@components/Category"
import meta from "@root/config/meta.json"
import { DynamicProps, PostType } from "types"

export default function Dynamic(props: DynamicProps) {
  const { type, post, allPosts, category } = props
  if (type === "page" || type === "post") return <Post post={post} />
  // if (isPost) return <Post post={post} />
  if (type === "category") return <Category allPosts={allPosts} category={category} />
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params

  const isCategory = slug.length === 1 && meta.categories.some((cat) => cat.slug === slug[0])
  const isPage = !isCategory && slug.length === 1
  const isPost = !isCategory && !isPage

  // Category Index Page
  if (isCategory) {
    const allPosts = getByCat("posts", slug[0])
    const category = meta.categories.filter((cat) => cat.slug === slug[0])?.[0]
    return {
      props: { type: "category", allPosts, category },
    }
  }
  let post: PostType = null
  if (isPage) post = getBySlug("pages", slug[0])
  if (isPost) post = getBySlug("posts", slug[1])
  // const post = isPage ?  : isPost ? getBySlug("posts", slug[1]) : null
  const content = await serialize(post.content)
  return {
    props: {
      type: isPage ? "page" : isPost ? "post" : null,
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getContent("posts")
  const pages = getContent("pages")
  const all = [...posts, ...pages]
  // const posts = getByCat("posts",)

  const paths = all.map((post) => {
    const slug = post.category ? [post.category, post.slug] : [post.slug]
    return {
      params: {
        slug,
      },
    }
  })
  const catPaths = meta.categories.map((cat) => ({ params: { slug: [cat.slug] } }))
  // const catPath = { params: { slug: ["projects"] } }
  return {
    paths: [...catPaths, ...paths],
    fallback: true,
  }
}
