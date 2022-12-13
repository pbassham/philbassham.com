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
  content: string
}
