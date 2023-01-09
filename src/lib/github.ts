import { graphql } from "@octokit/graphql"
import type { GraphQlQueryResponseData } from "@octokit/graphql"
import matter from "gray-matter"
import yaml from "js-yaml"
import { FrontMatter, PostType } from "types"
import { getIssueBySlug, updateSlugs } from "./cloudflareKv"
import { REPO, GITHUB_USERNAME } from "@root/githubCMS.config"
import generateCustomFieldsFragment from "./customFields"
const { GITHUB_TOKEN } = process.env

const request = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
})
let customFieldsFragment = generateCustomFieldsFragment()

function slugify(text) {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
}
const issueFragment = `title
				id
				number
				createdAt
				body
				bodyText
				bodyHTML 
				author {
					url
				}
				lastEditedAt
				bodyUrl
				milestone {
					title
				}
				milestone {description title state}
				labels(first: 50) {
					nodes {
						name
						color
						description
						id
					}
				}
`

export const getPosts = async () => {
  console.log(`Fetched Issues`)

  const data: GraphQlQueryResponseData = await request(
    `{
    repository(name: "${REPO}", owner: "${GITHUB_USERNAME}") {
      issues(first: 50) {
        nodes {
          ${issueFragment}
        }
      }
    }
  }
`
  )
  const issues = data.repository.issues.nodes.map((is) => ({
    ...is,
    slug: slugify(is.title),
  }))
  // const kvArray = issues.map((issue) => ({ key: issue.slug, value: issue.number.toString() }))
  // await updateSlugs(kvArray)
  //   const slug = slugify(issue?.title||"")
  return issues
}

// export const getPost = async (number) => {
export const getPost = async (slug: string) => {
  if (slug === "site.webmanifest") return
  if (slug === "favicon.ico") return
  const number = await getIssueBySlug(slug)
  if (number === "Error") await getPosts()
  //   const posts = await getPosts()
  //   const number = posts.filter((post) => post.slug === slug)[0]?.number
  const f = 2

  const data: GraphQlQueryResponseData = await request(
    `query getPost($number: Int!){
        repository(name: "${REPO}", owner: "${GITHUB_USERNAME}") {
        issue(number: $number) {
            ${issueFragment}
        }
      }
  }
`,
    {
      number: Number(number),
    }
  )
  // separates frontmatter from the body. allows you to serialize just the body
  const { data: frontMatter, content } = parseMarkdown(data.repository.issue.body)

  // @ts-ignore
  return {
    ...data.repository.issue,
    ...(frontMatter as FrontMatter), //allows overriding
    content,
    // raw: fileContents,
    // fullPath,
    // raw: data.repository.issue
    // slug: slug.replace(/\.md$/, ""),
  } as PostType

  //   return {
  //     content,
  //     post: data.repository.issue
  // }
}

/** Gets FRONTMATTER for SINGLE MDX post or page */
const parseMarkdown = (fileContents: string): matter.GrayMatterFile<string> => {
  return matter(fileContents, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  })
}
