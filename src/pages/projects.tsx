import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
import { getByTag, getContent } from "@lib/api"

const Projects = (props) => {
  return (
    <Layout>
      {/* <Hero title="I’m a product manager currently at MissionBase." /> */}
      <PostList {...props} />
    </Layout>
  )
}

export default Projects

export const getStaticProps = async () => {
  // const allPosts = getAllPosts(["title","subTitle", "date", "slug", "author", "coverImage", "excerpt"])
  //   const allPosts = getContent("posts")
  const allPosts = getByTag("posts", "project")

  return {
    props: { allPosts },
  }
}
