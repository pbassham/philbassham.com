import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Container from "@components/Container"
import PostBody from "@components/PostBody"
import Header from "@components/Header"
import PostHeader from "@components/PostHeader"
import Layout from "@components/Layout"
import { getBySlug, getAllPosts, getAllPages } from "@lib/api"
// import PostTitle from '@components/post-title'
import Head from "next/head"
// import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from "@lib/markdownToHtml"
import { PostType } from "../../types"
import { Text } from "@chakra-ui/react"
type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
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
            <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} subTitle={post.subTitle} />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getBySlug("post", params.slug, ["title", "subTitle", "date", "slug", "author", "content", "ogImage", "coverImage"])
  const content = await markdownToHtml(post.content || "")

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
  const posts = getAllPosts(["slug"])
//   const pages = getAllPages(["slug"])
//   const all = [...posts, ...pages]
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
