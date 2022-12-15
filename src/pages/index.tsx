import { Box, Container, Text, VStack } from "@chakra-ui/react"
// import Container from "@components/Container"
import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import { MDXComponents } from "@components/MDXComponents"
import { NextChakraLink } from "@components/NextChakraLink"
import PostBody from "@components/PostBody"
import PostList from "@components/PostList"
import Summary from "@components/Summary"
import { getBySlug, getContent } from "@lib/api"
import markdownToHtml from "@lib/markdownToHtml"
import { Prose } from "@nikolovlazar/chakra-ui-prose"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Link from "next/link"
import { PostType } from "types"

const Index = (props: { source: MDXRemoteSerializeResult; allPosts: PostType[] }) => {
  const { source } = props
  return (
    <Layout>
      {/* <Hero title="I’m a product manager currently at MissionBase." /> */}

      <MDXRemote {...source} components={MDXComponents} />
      <PostList {...props} />
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getContent("posts")
  const { content } = getBySlug("pages", "home")
  const mdxSource = await serialize(content)
  // const content = await markdownToHtml(home.content || "")
  return {
    props: { allPosts, source: mdxSource },
  }
}
