import fs from "fs"
import { join } from "path"
import yaml from "js-yaml"
import matter from "gray-matter"
import { parseISO } from "date-fns"

const postsDirectory = join(process.cwd(), "content", "posts")
const pagesDirectory = join(process.cwd(), "content", "pages")

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}
export function getPageSlugs() {
  return fs.readdirSync(pagesDirectory)
}

type Items = {
  [key: string]: string
}
export function getBySlug(type: "post" | "page", slug: string, fields: string[] = []) {
  const directory = type === "post" ? postsDirectory : pagesDirectory
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(directory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  })

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug
    }
    if (field === "content") {
      items[field] = content
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getBySlug("post", slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    // .sort((post1, post2) => {
    //   return parseISO(post1.date).getTime() > parseISO(post2.date).getTime() ? -1 : 1
    // })
  // return post1.date > parseISO(post2.date).getTime() ? -1 : 1)})
  return posts
}

export function getAllPages(fields: string[] = []) {
  const slugs = getPageSlugs()
  const pages = slugs
    .map((slug) => getBySlug("page", slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (parseISO(post1.date).getTime() > parseISO(post2.date).getTime() ? -1 : 1))
  // return parseISO(b.date).getTime() - parseISO(a.date).getTime()
  return pages
}
