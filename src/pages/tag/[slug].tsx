import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
// import { getByCat, getByTag, getContent } from "@lib/api"
import meta from "@root/config/meta.json"
import { Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import { GetStaticPathsResult } from "next"

const Index = (props) => {
  const { tags } = meta
  const tag = tags.filter((tag) => tag.slug === props.tag)?.[0]
  // const router = useRouter()
  // if (!router.isFallback
  // && !post?.slug
  // ) {
  // return <ErrorPage statusCode={404} />
  // }
  return (
    <Layout>
      <Hero title={`Tagged: ${tag?.name}`} />
      {/* <Text>{projects?.description} TAG</Text> */}
      <PostList {...props} />
    </Layout>
  )
}

export default Index

// export const getStaticProps = async ({ params }) => {
  // const allPosts = getByTag("posts", params.slug) || []

  // return {
  //   props: { allPosts, tag: params.slug },
  // }
// }

// export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // const posts = getContent("posts")
  // // const posts = getByTag("posts","personal")
  // return {
  //   paths: posts.map((post) => {
  //     return {
  //       params: {
  //         slug: post.slug,
  //       },
  //     }
  //   }),
  //   fallback: true,
  // }
// }
