// import { customFields } from "@root/githubCMS.config"
// import { CustomFieldsType } from "types"
import { graphql } from "@octokit/graphql"
import { GraphQlQueryResponseData } from "@octokit/graphql/dist-types/types"
import config, { GITHUB_USERNAME } from "@root/githubCMS.config"
const { GITHUB_TOKEN } = process.env
const request = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
})
var camalize = function camalize(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}
export default async function generateCustomFieldsFragment(): Promise<string> {
  const data: GraphQlQueryResponseData = await request(`{
    user(login: "${GITHUB_USERNAME}") {
      projectV2(number: 4) {
        title
        shortDescription
        number
        url
        fields(first: 50) {
          nodes {
            ... on ProjectV2FieldCommon {
              name
              dataType
              __typename
              id
            }
  
            ... on ProjectV2SingleSelectField {
              options {
                id
                name
              }
            }
            ... on ProjectV2Field{
              name id
            }
            ...on ProjectV2IterationField{
              name
            }
          }
        }
      }
    }
  }
  `)

  const customFields = data.user.projectV2.fields.nodes.filter((field) => {
    // console.log(field);
    if (field.dataType === "LINKED_PULL_REQUESTS") return false
    if (field.dataType === "TITLE") return false
    if (field.dataType === "ASSIGNEES") return false
    if (field.dataType === "LABELS") return false
    if (field.dataType === "REVIEWERS") return false
    if (field.dataType === "REPOSITORY") return false
    if (field.dataType === "MILESTONE") return false
    if (field.dataType === "ITERATION") return false
    if (field.dataType === "PARENT_ISSUE") return false
    if (field.dataType === "SUB_ISSUES_PROGRESS") return false
    // if (field.dataType === '') return false
    return true
  })

  let fields = ``
  customFields.forEach((customField) => {
    // const keyName = customField.name.toLowerCase().replace(/ /g, "_")
    // camelcase key if there is a space, otherwise, nothing
    const keyName = /\s/g.test(customField.name) ? camalize(customField.name) : customField.name //.toLowerCase().replace(/ /g, "_")

    const fieldsToGet = getFields(customField)

    fields += `${keyName}: fieldValueByName(name:"${customField.name}") {
              
              ${fieldsToGet}
          }\n`
  })
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
				milestone {description title state}
				labels(first: 50) {
					nodes {
						name
						color
						description
						id
					}
				}
        projectItems(first: 1) {
          nodes {
            project {
              title
            }
            ${fields}
          }
        }
`
  // console.log(fields)
  return issueFragment
}
/** Returns object with {key:value} for each custom field */
export function parseCustomFields(issue): Record<string, string> {
  const projectFields = issue.projectItems.nodes?.[0]
  if (!projectFields) {
    console.log(`No Custom Fields to Parse for Project`)
    return null
  }
  // issue.projectItems.nodes[0].category
  const returnFields = {}
  for (const [key, value] of Object.entries(projectFields)) {
    // console.log(`${key}: ${value}`)
    const val = value?.["date"] || value?.["text"] || value?.["name"] || null
    returnFields[key] = val
  }
  // console.log(`Custom Fields:`, returnFields)
  return returnFields
}
function getFields(field): string {
  // let fields = ``

  const options = {
    DATE: "ProjectV2ItemFieldDateValue",
    ITERATION: "ProjectV2ItemFieldIterationValue",
    LABELS: "ProjectV2ItemFieldLabelValue",
    MILESTONE: "ProjectV2ItemFieldMilestoneValue",
    NUMBER: "ProjectV2ItemFieldNumberValue",
    PULL_REQUEST: "ProjectV2ItemFieldPullRequestValue",
    REPOSITORY: "ProjectV2ItemFieldRepositoryValue",
    REVIEWERS: "ProjectV2ItemFieldReviewerValue",
    SINGLE_SELECT: "ProjectV2ItemFieldSingleSelectValue",
    TEXT: "ProjectV2ItemFieldTextValue",
    ASSIGNEES: "ProjectV2ItemFieldUserValue",
  }
  const fetchFields = {
    DATE: "date",
    ITERATION: "id name",
    LABELS: "id name",
    MILESTONE: "id name",
    NUMBER: "name",
    PULL_REQUEST: "name",
    REPOSITORY: "name",
    REVIEWERS: "name",
    SINGLE_SELECT: "name",
    TEXT: "text",
    ASSIGNEES: "id",
  }
  const onField = options[field.dataType]
  return `...on ${onField} {${fetchFields[field.dataType]} }\n`
}
