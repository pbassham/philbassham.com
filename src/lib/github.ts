import { graphql } from "@octokit/graphql"
import type { GraphQlQueryResponseData } from "@octokit/graphql"
import matter from "gray-matter"
import yaml from "js-yaml"
import { FrontMatter, PostType } from "types"
import { serialize } from "next-mdx-remote/serialize"
import { is } from "date-fns/locale"

const { GITHUB_TOKEN, CLOUDFLARE_TOKEN } = process.env

const repo = "philbassham.com"
const owner = "pbassham"

const request = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
})

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
    repository(name: "${repo}", owner: "${owner}") {
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
  const kvArray = issues.map((issue) => ({ key: issue.slug, value: issue.number.toString() }))
  await updateKeys(kvArray)
  //   const slug = slugify(issue?.title||"")
  return issues
}
// export const getPost = async (number) => {
export const getPost = async (slug: string) => {
  if (slug === "site.webmanifest") return
  if (slug === "favicon.ico") return
  const number = await getKey(slug)
  //   const posts = await getPosts()
  //   const number = posts.filter((post) => post.slug === slug)[0]?.number
  const f = 2

  const data: GraphQlQueryResponseData = await request(
    `query getPost($number: Int!){
        repository(name: "${repo}", owner: "${owner}") {
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

export async function updateKey(key, value) {
  const body = value //JSON.stringify(req.query.value)
  const accountID = "007dc0fad0df7af5af5aebb5ca7cbf18"
  const namespaceID = "6de583abb4c14a71b925fd188e35d16a"

  const { success, result, errors } = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body,
    }
  ).then((response) => response.json())

  // ...
}
export interface KV {
  key: string
  value: string
}
export async function updateKeys(kvArray: KV[]) {
  //   const body = kvArray //JSON.stringify(req.query.value)
  const accountID = "007dc0fad0df7af5af5aebb5ca7cbf18"
  const namespaceID = "6de583abb4c14a71b925fd188e35d16a"

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kvArray),
    // body: '[{"base64":false,"expiration":1578435000,"expiration_ttl":300,"key":"My-Key","metadata":{"someMetadataKey":"someMetadataValue"},"value":"Some string"}]',
  }
  const { success, result, errors } = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/bulk`,
    options
  ).then((response) => response.json())
  console.log(result)

  // ...
}

export async function getKey(key): Promise<string> {
  const accountID = "007dc0fad0df7af5af5aebb5ca7cbf18"
  const namespaceID = "6de583abb4c14a71b925fd188e35d16a"
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_TOKEN}`,
      "Content-Type": "application/json",
    },
  }

  return await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((err) => console.error(err))
}
