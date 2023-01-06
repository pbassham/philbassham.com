import { useRouter } from "next/router"
import ErrorPage from "next/error"
import PostBody from "@components/PostBody"
import PostHeader from "@components/PostHeader"
import Layout from "@components/Layout"
import { PostProps, PostType } from "../types"
import { Text } from "@chakra-ui/react"
import Meta from "./Meta"

const Post = (props: PostProps) => {
  const { post } = props
  const router = useRouter()
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }
  return (
    <Layout>
      {router.isFallback ? (
        //   <PostTitle>Loading…</PostTitle>
        <Text>Loading…</Text>
      ) : (
        <>
          <article className="mb-32">
            <Meta {...post} />

            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              subTitle={post.subTitle}
              {...post}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  )
}

export default Post
