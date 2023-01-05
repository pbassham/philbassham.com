// import Container from "@components/Container"
import Layout from "@components/Layout"
import { MDXComponents } from "@components/MDXComponents"
import Meta from "@components/Meta"
import PostList from "@components/PostList"
import { getBySlug, getContent } from "@lib/api"
import { getPosts } from "@lib/github"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { PostType } from "types"
// FIXME: add SEO Meta fields
const Index = (props: { source: MDXRemoteSerializeResult; allPosts: PostType[] }) => {
  const { source } = props
  return (
    <Layout>
      {/* <Hero title="I’m a product manager currently at MissionBase." /> */}
      {/* @ts-ignore */}
      <Meta title="Home" />
      <MDXRemote {...source} components={MDXComponents} />
      <PostList {...props} />
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
    const allPosts = await getPosts()
//   const allPosts = getContent("posts")
//   const { content } = getBySlug("pages", "home")
//   const mdxSource = await serialize(content)
const g =2
  const mdxSource = await serialize(allPosts[0].body)
  // const content = await markdownToHtml(home.content || "")
  return {
    props: { allPosts, source: mdxSource },
  }
}
