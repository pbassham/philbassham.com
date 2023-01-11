// @ts-nocheck
import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
import { Text, VStack } from "@chakra-ui/react"
import Meta from "./Meta"
import { Label, PostType } from "types"
import { MDXComponents } from "./MDXComponents"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
// import projects from './projects'
// FIXME: fix the SEO props on Metadata
// FIXME: get title without type errors
// FIXME: get description without error
// FIXME: the width of the MDX is bad
const Category = (props: CategoryProps) => {
  const { allPosts, category: post } = props
  {/* @ts-ignore */}
  const title = post?.title || post?.name
  const description = post?.description //|| post?.
  return (
    <Layout>
      {/* @ts-ignore */}
      <Meta title={title} />
      <PostHeader
        title={title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
        subTitle={post.subTitle || description}
        {...post}
      />
      {post?.content ? <PostBody content={post?.content} /> : null}
      {/* </VStack> */}
      <PostList allPosts={allPosts} />
    </Layout>
  )
}
export type CategoryProps = {
  allPosts: PostType[]
  category: Label | PostType
  // source?: MDXRemoteSerializeResult
}
export default Category
