# Personal portfolio site

- Category pages
  - if there is no category for a post, it goes into the /posts/ url
  - otherwise, there is an index for a category. Example /projects
- Tags
  - used to tag context of a project. personal, company, etc

# GitHub Projects as CMS for Next.js site

Uses Github Projects (v2) as CMS. 

#### Features:
- Issue = Page or Post
- Category Pages (using custom field in project)
- Tag Pages using github Labels
- MDX Components
- public editing option
- 

## Instructions

### Github Issues Configuration

1. Set publish tag (only Issues with this tag will be published)
2. (Optional) Set up Issue Templates (For Post Templates, etc)

### Github Project Configuration

1. Create a Project
2. Enter the Project Number \_\_\_
3. Create Custom fields (fields with no space will be used as is, if the name has a space it will turn to camelCase)
   1. Category
   2. Cover Image
   3. Publish Date

### Cloudflare Key-Value Store Configuration

Need to use the KV store of cloudflare (or anywhere else) to convert between slugs and issue IDs because the Github api only allows fetching issues by ID.

- Instructions: https://giuseppegurgone.com/vercel-cloudflare-kv

### Configure Vercel Environment Variables

1. GITHUB_TOKEN
2. CLOUDFLARE_TOKEN

### Finally, configure this project

Example:

```
{
  publish_tag:'',
  org_project:false,
  username:"", // use Organization username if Organization
  project_num: 1,
}
```
