// import Container from "@components/Container"
import { Center, Container, Heading, Highlight } from "@chakra-ui/react"
import Layout from "@components/Layout"
import { MDXComponents } from "@components/MDXComponents"
import Meta from "@components/Meta"
import PostList from "@components/PostList"
import Tags from "@components/Tags"
// import { getBySlug, getContent } from "@lib/api"
import { getPost, getPosts } from "@lib/github"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { PostType } from "types"
// FIXME: add SEO Meta fields
const Index = (props: { source: MDXRemoteSerializeResult; allPosts: PostType[]; home: PostType }) => {
  const { source, home } = props
  return (
    <Layout>
      {/* <Hero title="I’m a product manager currently at MissionBase." /> */}
      {/* @ts-ignore */}
      <Meta title="Home" />
      <Heading as='h1' size='3xl' mt='8' fontWeight='extrabold'>
          <Highlight query="I'm Philip" styles={{bg:'purple.300'}}>
            Hi, I'm Philip, and this is some of my work.
          </Highlight>
      </Heading>
      <MDXRemote {...source} components={MDXComponents} />
      <Tags
        tags={home?.tags}
        justify="center"
        // px={10}
        pb={10}
        spacing="3"
        badgeProps={{
          fontSize: "md",
          variant: "subtle",
          colorScheme: "cyan",
          p: "3",
          borderRadius: "md",
          fontFamily: "mono",
        }}
      />

      <PostList {...props} />
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  // const allPosts = getContent("posts")
  const allPosts = await getPosts(["post"])
  // const { contentX } = getBySlug("pages", "home")
  const home = await getPost("home")
  const mdxSource = await serialize(home?.content)
  // const content = await markdownToHtml(home.content || "")
  return {
    props: { allPosts, source: mdxSource, home },
    revalidate: 10,
  }
}
