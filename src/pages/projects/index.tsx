import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
import { getByCat, getContent } from "@lib/api"
import meta from "@root/config/meta.json"
import { Text } from "@chakra-ui/react"

const Index = (props) => {
  const { categories } = meta
  const projects = categories.filter((cat) => cat.slug === "projects")?.[0]
  return (
    <Layout>
      <Hero title={projects?.name} />
      <Text>{projects?.description}</Text>
      <PostList {...props} category='projects' />
    </Layout>
  )
}

export default Index

export const getStaticProps = async ({ params }) => {
  const allPosts = getByCat("posts", "projects")

  return {
    props: { allPosts },
  }
}
