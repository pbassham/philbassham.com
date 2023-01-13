import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_NAMESPACE_ID } from "@root/githubCMS.config"
const { CLOUDFLARE_TOKEN } = process.env
const headers = {
  Authorization: `Bearer ${CLOUDFLARE_TOKEN}`,
  "Content-Type": "application/json",
}

/**TODO: Update to use github actions instead of doing it here
 *
 */

export async function updateKey(key, value) {
  const { success, result, errors } = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CLOUDFLARE_NAMESPACE_ID}/values/${key}`,
    {
      method: "PUT",
      headers,
      body: value,
    }
  ).then((response) => response.json())

  // ...
}
export interface KV {
  key: string
  value: string
}

export async function updateSlugs(kvArray: KV[]): Promise<string> {
  //   const body = kvArray //JSON.stringify(req.query.value)

  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(kvArray),
    // body: '[{"base64":false,"expiration":1578435000,"expiration_ttl":300,"key":"My-Key","metadata":{"someMetadataKey":"someMetadataValue"},"value":"Some string"}]',
  }
  const { success, result, errors } = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CLOUDFLARE_NAMESPACE_ID}/bulk`,
    options
  ).then((response) => response.json())
  console.log(result)
  return result
  // ...
}

export async function getIssueBySlug(key): Promise<string> {
  try {
    const options = {
      method: "GET",
      headers,
    }

    return await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CLOUDFLARE_NAMESPACE_ID}/values/${key}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        return response
      })
    // .catch((err) => {
    // })
  } catch (error) {
    console.error(error)
    return `Error`
  }
}
export async function getSlugs(): Promise<string> {
  const options = {
    method: "GET",
    headers,
  }

  return await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CLOUDFLARE_NAMESPACE_ID}/keys`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((err) => {
      console.error(err)
      return `Error`
    })
}
// getSlugs()
