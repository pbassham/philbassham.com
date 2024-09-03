# Personal portfolio site

- Category pages
  - if there is no category for a post, it goes into the /posts/ url
  - otherwise, there is an index for a category. Example /projects
- Tags
  - Used to tag context of a project. (personal, company, etc.)

# GitHub Projects as CMS for Next.js site

Uses GitHub Projects (v2) as CMS. 

#### Features:
- Issue = Page or Post
- Category Pages (using custom field in the GitHub project)
- Tag Pages using GitHub Labels
- MDX Components
- public editing option
- Live updating site without a redeployment to Vercel. Just need to refresh the homepage, and it checks for new issues and builds the pages.

## Instructions

### GitHub Issues Configuration

1. Set publish tag (only Issues with this tag will be published)
2. (Optional) Set up Issue Templates (For Post Templates, etc.)

### GitHub Project Configuration

1. Create a Project
2. Enter the Project Number \_\_\_ in the configuration file `githubCMS.config.ts`
3. Create Custom fields (fields with no space will be used as is, if the name has a space it will turn to camelCase)
   1. Category
   2. Cover Image
   3. Publish Date

### Cloudflare Key-Value Store Configuration

Need to use the KV store of cloudflare (or anywhere else) to convert between slugs and issue IDs because the GitHub api only allows fetching issues by ID.

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
### To Make a Category Page
1. Create a new issue in the project and title it the category name (e.g. Posts)
2. Set a subtitle that will show up on the category page as a description.