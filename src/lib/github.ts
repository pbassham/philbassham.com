import { graphql } from "@octokit/graphql"
import type { GraphQlQueryResponseData } from "@octokit/graphql"
import matter from "gray-matter"
import yaml from "js-yaml"
import { FrontMatter, Label, PostType, Project, ProjectFields } from "types"
import { getIssueBySlug, updateSlugs } from "./cloudflareKv"
import config, { REPO, GITHUB_USERNAME, PROJECT_NUM, PUBLISH_TAGS } from "@root/githubCMS.config"
import generateCustomFieldsFragment, { parseCustomFields } from "./customFields"
const { GITHUB_TOKEN } = process.env

const request = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
})
// let customFieldsFragment = generateCustomFieldsFragment().then((res)=>res)

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

export const getPosts = async (labels: string[]): Promise<PostType[]> => {
  console.log(`Fetched Issues`)
  const labelFilter = `label:` + [...PUBLISH_TAGS, ...labels].join(` label:`)
  // console.log(labelFilter);

  try {
    let issueFragment = await generateCustomFieldsFragment()
    const data: GraphQlQueryResponseData = await request(
      `{
        search(
        type: ISSUE
        query: "repo:${GITHUB_USERNAME}/${REPO} ${labelFilter}"
        first:100
      ){
          nodes {
            ...on Issue{
              ${issueFragment}
            }
          }
      }
    }
    `
      // }
    )
    const i = 1
    // const issues = data.repository.issues.nodes.map((issue) => {
    const issues = data.search.nodes.map((issue) => {
      const { data: frontMatter, content } = parseMarkdown(issue.body)

      const tags: Label[] = issue.labels.nodes || null
      const customFields = parseCustomFields(issue)
      return {
        ...issue,
        ...customFields,
        // date,
        // category,
        // coverImage,
        // subTitle,
        slug: slugify(issue.title),
        tags,
        ...(frontMatter as FrontMatter), //allows overriding via frontmatter
      }
    })
    // const kvArray = issues.map((issue) => ({ key: issue.slug, value: issue.number.toString() }))
    // await updateSlugs(kvArray)
    //   const slug = slugify(issue?.title||"")
    return issues
  } catch (error) {
    console.log(error)
  }
}

// export const getPost = async (number) => {
export const getPost = async (slug: string): Promise<PostType> => {
  try {
    if (slug === "site.webmanifest") return
    if (slug === "favicon.ico") return
    const number = await getIssueBySlug(slug)
    if (number === "Error") throw `no issue number for slug: ${slug}`
    //   const posts = await getPosts()
    //   const number = posts.filter((post) => post.slug === slug)[0]?.number
    const f = 2
    let issueFragment = await generateCustomFieldsFragment()
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

    const customFields = parseCustomFields(data.repository.issue)
    const tags = data.repository.issue.labels.nodes || null
    // console.log(data)

    // @ts-ignore
    return {
      ...data.repository.issue,
      ...customFields,
      // category,
      // coverImage,
      // subTitle,
      // date,
      content,
      tags,
      ...(frontMatter as FrontMatter), //allows overriding via frontmatter
      // raw: fileContents,
      // fullPath,
      // raw: data.repository.issue
      // slug: slug.replace(/\.md$/, ""),
    } as PostType
  } catch (error) {
    console.error(error)
  }
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

export const getLabels = async (): Promise<Label[]> => {
  console.log(`Fetched Labels`)

  const data: GraphQlQueryResponseData = await request(
    `{
    repository(name: "${REPO}", owner: "${GITHUB_USERNAME}") {
      labels(first: 100) {
        nodes{
          color
          description
          id
          name
          url   
        }
      }
    }
  }
`
  )
  const labels = data.repository.labels.nodes
  // console.log(labels);

  return labels
}

export const getProject = async (): Promise<Project> => {
  console.log(`Fetched Project`)

  const data: GraphQlQueryResponseData = await request(
    `{
      user(login: ${GITHUB_USERNAME}) {
        projectV2(number: ${PROJECT_NUM}) {
          title
          shortDescription
          number
          url
          fields(first: 50) {
            nodes {
              ... on ProjectV2FieldCommon {
                name
                dataType
                id
              }
    
              ... on ProjectV2SingleSelectField {
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    
`
  )
  const fields: ProjectFields = data.user.projectV2.fields.nodes
  const project: Project = data.user.projectV2
  return { ...project, ...fields }
}
