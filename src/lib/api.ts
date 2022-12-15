import fs from "fs"
import { join } from "path"
import yaml from "js-yaml"
import matter from "gray-matter"
import { parseISO } from "date-fns"
import { ContentType, FrontMatter, PostType } from "types"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from "next-mdx-remote"

export function getBySlug(type: ContentType, slug: string) {
  const posts = getContent(type)
  return posts.filter((post) => post.slug === slug)[0]
}
export function getByTag(type: ContentType, tag: string) {
  const posts = getContent(type)
  return posts.filter((post) => post?.tags?.includes(tag))
  // const hasTag = post.tags && post.tags.includes(tag)
}
export function getByCat(type: ContentType, category: string) {
  const posts = getContent(type)
  return posts.filter((post) => post?.category === category)
  // const hasTag = post.tags && post.tags.includes(tag)
}

export function getContent(type: ContentType): PostType[] {
  // const { type } = props
  // let path = type
  // if (slug) path += `/${slug}`
  const directory = join(process.cwd(), "content", type)
  const slugs = fs.readdirSync(directory)
  const content = slugs
    .map((slug) => {
      // const fullPath = join(directory, `${realSlug}.md`)
      const fullPath = join(directory, slug)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = parseMarkdown(fileContents)
      // const mdxSource = await serialize(content)
      // @ts-ignore
      return {
        ...(data as FrontMatter),
        raw: fileContents,
        content,
        fullPath,
        slug: slug.replace(/\.md$/, ""),
      } as PostType
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return content || []
}

/** Gets FRONTMATTER for SINGLE MDX post or page */
const parseMarkdown = (fileContents: string): matter.GrayMatterFile<string> => {
  return matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  })
}
