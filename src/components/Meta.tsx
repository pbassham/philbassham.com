// import PostTitle from '@components/post-title'
import Head from "next/head"
import { PostType } from "../types"
import config from "@root/config/config.json"

interface MetaProps extends PostType {
  keywords?: string[]
}
const Meta = (props: MetaProps) => {
  const { slug, title, ogImage, subTitle, excerpt, author, keywords } = props
  const { site_title, site_description, site_keywords, base_url } = config
  return (
    <Head>
      <title>{title ? [title, site_title].join(" | ") : site_title}</title>
      <meta property="description" content={subTitle || excerpt || site_description}></meta>
      <meta property="og:image" content={ogImage?.url} />
      <meta name="keywords" content={keywords ? keywords.join(",") : site_keywords.map((it) => it.keyword).join(",")} />
      {author ? <meta name="author" content={author.name} /> : null}
      <link rel="canonical" href={base_url + slug} />
    </Head>
  )
}

export default Meta
