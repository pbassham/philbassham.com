import { CONFIG_TYPE } from "types"

// Config Values
export const config: CONFIG_TYPE = {
  PUBLISH_TAGS: ["published"],
  HIDE_TAGS: ["page", "post",'published'], //github issue labels to NOT show on frontend
  GITHUB_USERNAME: "pbassham", // use Organization's username if Organization
  IS_ORG: false, // username is of a Github organization, not user
  PROJECT_NUM: 4,
  REPO: "philbassham.com",
  CLOUDFLARE_ACCOUNT_ID: "007dc0fad0df7af5af5aebb5ca7cbf18",
  CLOUDFLARE_NAMESPACE_ID: "6de583abb4c14a71b925fd188e35d16a",
}

//

/**For fields that you add to the project that you want to use on the frontend, add them here.
 * Name is the case-sensitive title of the fields to fetch
 */
// export const customFields: CustomFieldsType[] = [
//   {
//     key: "category",
//     name: "Category",
//     type: "singleSelect",
//   },
//   {
//     key: "date",
//     name: "Publish Date",
//     type: "date",
//   },
//   {
//     key: "coverImage",
//     name: "Cover Image",
//     type: "text",
//   },
//   {
//     key: "subTitle",
//     name: "Subtitle",
//     type: "text",
//   },
// ]

// export const customFields = {
//   category: {
//     name: "Category",
//     type: "singleSelect",
//   },
//   date: {
//     name: "Publish Date",
//     type: "date",
//   },
//   coverImage: {
//     name: "Cover Image",
//     type: "text",
//   },
//   subtitle: {
//     name: "Subtitle",
//     type: "text",
//   },
// }

export const { PROJECT_NUM, PUBLISH_TAGS, GITHUB_USERNAME, REPO, IS_ORG, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_NAMESPACE_ID } = config

export default config
