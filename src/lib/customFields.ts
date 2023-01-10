import { customFields } from "@root/githubCMS.config"

export default function generateCustomFieldsFragment(): string {
  let fields = ``
  customFields.forEach((customField) => {
    if (customField.type === "singleSelect") {
      fields += `${customField.key}: fieldValueByName(name:"${customField.name}") {
            ...on ProjectV2ItemFieldSingleSelectValue {
                name
            }
        }\n`
    }
    if (customField.type === "text") {
      fields += `${customField.key}: fieldValueByName(name:"${customField.name}") {
            ...on ProjectV2ItemFieldTextValue {
                text
            }
        }\n`
    }
    if (customField.type === "date") {
      fields += `${customField.key}: fieldValueByName(name:"${customField.name}") {
            ...on ProjectV2ItemFieldDateValue {
                date
            }
        }\n`
    }
  })
  // console.log(fields)
  return fields
}

export function parseCustomFields() {}
