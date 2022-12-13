import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
import { getByCat, getByTag, getContent } from "@lib/api"
import { useRouter } from "next/router"

const Projects = (props) => {
  const router = useRouter()
  const { category } = router.query
  return (
    <Layout>
      <Hero title={`Category: ${props.category}`} />
      <PostList {...props} />
    </Layout>
  )
}

export default Projects

export const getStaticProps = async ({params}) => {
  const category = params.category[0] || ""
  const post = getByCat("posts", category)
  // const allPosts = getByTag("posts", "project")

  return {
    props: { allPosts:post, category },
  }
}
export async function getStaticPaths(params) {
  const pages = getContent("posts").filter((page)=> page.category)
  // pages.filter((page)=> page.category)
  // const pages = getByCat('posts',"projects")

  return {
    paths: pages.map((post) => {
      return {
        params: {
          slug: post.slug,
          category: [post.category],
        },
      }
    }),
    fallback: false,
  }
}
