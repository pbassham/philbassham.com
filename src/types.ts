import { MDXRemoteSerializeResult } from "next-mdx-remote"
// import { customFields } from "@root/githubCMS.config"

export interface PostType extends FrontMatter {
  raw: string
  slug: string
  fullPath: string
}
export type Author = {
  name: string
  picture: string
}
export type ContentType = "pages" | "posts"

export type FrontMatter = {
  title: string
  subTitle: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  // content: string
  content: MDXRemoteSerializeResult //| string
  tags: Label[] //string[]
  category: string
}

export type Params = {
  params: {
    slug: string
  }
}

export type PostProps = {
  post: PostType
  // morePosts: PostType[]
  // preview?: boolean
}

export type DynamicProps = {
  type: "post" | "page" | "category"
  post: PostType
  allPosts: PostType[]
  category: Label
  source: MDXRemoteSerializeResult
}

// for github CMS
export type CONFIG_TYPE = {
  PUBLISH_TAG: String
  IS_ORG: Boolean
  GITHUB_USERNAME: String
  PROJECT_NUM: Number
  REPO: string
  CLOUDFLARE_ACCOUNT_ID: string
  CLOUDFLARE_NAMESPACE_ID: string
}

export type Label = {
  color: string
  description: string
  id: string
  name: string
  url: string
  // content?: MDXRemoteSerializeResult
}

export type Project = {
  title: string
  shortDescription: string
  number: number
  url: string
  fields: ProjectFields
}

export type ProjectFields = {
  name: string
  dataType: string
  id: string
  options?: SelectOptions
}
export type SelectOptions = {
  id: string
  name: string
}

// export type CustomFieldsType = {
//   key: string
//   name: string
//   type: ProjectFieldTypes
// }

// export type ProjectFieldTypes = "singleSelect" | "date" | "text" | "number" | "iteration"
// type f = typeof customFields[number]['key']
// type CustomKeys = keyof typeof customFields
// type CustomValues =  typeof customFields[CustomKeys]
/**Explain */
// export type CustomFieldsType = Record<CustomKeys, { name: string; type: ProjectFieldTypes }>
