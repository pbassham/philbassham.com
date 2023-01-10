// import Container from "@components/Container"
import Layout from "@components/Layout"
import { MDXComponents } from "@components/MDXComponents"
import Meta from "@components/Meta"
import PostList from "@components/PostList"
// import { getBySlug, getContent } from "@lib/api"
import { getPost, getPosts } from "@lib/github"
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
  // const allPosts = getContent("posts")
  const allPosts = await getPosts(["post"])
  // const { contentX } = getBySlug("pages", "home")
  const {content} = await getPost('home')
  const mdxSource = await serialize(content)
  // const content = await markdownToHtml(home.content || "")
  return {
    props: { allPosts, source: mdxSource },
  }
}
