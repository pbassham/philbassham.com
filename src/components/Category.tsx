import { Hero } from "@components/Hero"
import Layout from "@components/Layout"
import PostList from "@components/PostList"
import { Text, VStack } from "@chakra-ui/react"
// import projects from './projects'

const Category = (props) => {
  const { allPosts, category } = props
  return (
    <Layout>
      <VStack>
        <Hero title={category?.name} />
        <Text fontSize="xl" fontFamily={"mono"}>
          {category?.description}
        </Text>
      </VStack>
      <PostList allPosts={allPosts} />
    </Layout>
  )
}

export default Category
