import { useRouter } from "next/router"
import ErrorPage from "next/error"
import PostBody from "@components/PostBody"
import PostHeader from "@components/PostHeader"
import Layout from "@components/Layout"
// import PostTitle from '@components/post-title'
import Head from "next/head"
// import { CMS_NAME } from '../../lib/constants'
import { FrontMatter, PostProps, PostType } from "../types"
import { Text } from "@chakra-ui/react"

const Meta = (props: PostType) => {
  const { slug, title, ogImage } = props
  return (
    <Head>
      <title>{title} | Philip Bassham</title>
      <meta property="og:image" content={ogImage?.url} />
    </Head>
  )
}

export default Meta
