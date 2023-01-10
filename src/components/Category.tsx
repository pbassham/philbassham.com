import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
import { Text, VStack } from "@chakra-ui/react"
import Meta from "./Meta"
import { Label, PostType } from "types"
import { MDXComponents } from "./MDXComponents"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
// import projects from './projects'
// FIXME: fix the SEO props on Metadata
// FIXME: get title without type errors
// FIXME: get description without error
// FIXME: the width of the MDX is bad
const Category = (props: CategoryProps) => {
  const { allPosts, category, source } = props
  {/* @ts-ignore */}
  const title = category?.title || category?.name
  // const description = category.description
  return (
    <Layout>
      {/* @ts-ignore */}
      <Meta title={title} />
      {/* <VStack minW={"3xl"}> */}
      <Hero title={title} />
      {source ? (
        <MDXRemote {...source} components={MDXComponents} />
        ) : (
          <Text fontSize="xl" fontFamily={"mono"}>
          {/* @ts-ignore */}
          {category?.description}
        </Text>
      )}
      {/* </VStack> */}
      <PostList allPosts={allPosts} />
    </Layout>
  )
}
export type CategoryProps = {
  allPosts: PostType[]
  category: Label | PostType
  source?: MDXRemoteSerializeResult
}
export default Category
