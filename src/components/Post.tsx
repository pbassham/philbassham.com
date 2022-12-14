import { useRouter } from "next/router"
import ErrorPage from "next/error"
import PostBody from "@components/PostBody"
import PostHeader from "@components/PostHeader"
import Layout from "@components/Layout"
// import PostTitle from '@components/post-title'
import Head from "next/head"
// import { CMS_NAME } from '../../lib/constants'
import { PostProps, PostType } from "../types"
import { Text } from "@chakra-ui/react"

const Post = ({ post, morePosts, preview }: PostProps) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      {router.isFallback ? (
        //   <PostTitle>Loading…</PostTitle>
        <Text>Loading…</Text>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Philip Bassham</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
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
