import { graphql } from "@octokit/graphql"
import type { GraphQlQueryResponseData } from "@octokit/graphql"
const { GITHUB_TOKEN } = process.env

const repo = "philbassham.com"
const owner = "pbassham"

const request = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
})

const issueFragment = `title
number
createdAt
bodyHTML
body
bodyText`

export const getPosts = async () => {
  const data:GraphQlQueryResponseData = await request(
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
  return data.repository.issues.nodes
}
export const getPost = async (number) => {
  const data:GraphQlQueryResponseData = await request(
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
  return data.repository.issue
}
