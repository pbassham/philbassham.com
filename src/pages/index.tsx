import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
import { getAllPosts } from "@lib/api"

const Index = (props) => {
  return (
    <Layout>
      <Hero title="I’m a product manager currently at MissionBase." />
      <PostList {...props} />
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title","subTitle", "date", "slug", "author", "coverImage", "excerpt"])

  return {
    props: { allPosts },
  }
}
