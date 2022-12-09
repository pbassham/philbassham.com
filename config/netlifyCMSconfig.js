let branch = "main"
let publish = false
// import { pages } from "@root/cache/data"
import siteConfig from "@config/meta"
const { authors, categories } = siteConfig
// console.log(siteConfig, authors)
// import categoryConfig from "@root/meta/categories.json"
// import jwtDecode from "jwt-decode"
if (typeof window !== "undefined") {
  console.log("You are on the browser")
  // ✅ Can use window here
  window.CMS_MANUAL_INIT = true
  //   const user = window.netlifyIdentity.currentUser()
  //   const data = jwtDecode(user?.token?.access_token)
  //   const isAdmin = data && data?.app_metadata?.roles?.includes("admin") || false
  //   console.log("isAdmin", isAdmin)
  //   publish = isAdmin
} else {
  console.log("You are on the server")
  // ⛔️ Don't use window here
  console.log(process.env.NODE_ENV === "development")
}
const url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.philbassham.com"
// const pageTitles = pages
//   .map((p) => {
//     let catName = categoryConfig.categories.filter((cat) => cat.slug === p.category)
//     catName = catName?.[0]?.name
//     // console.log(catName?.[0]?.name);
//     const label = `(${catName}) ${p.title}`
//     return { label, value: p.id }
//   })
//   .sort((a, b) => {
//     if (a.label < b.label) return -1
//     if (a.label > b.label) return 1
//   })
// console.log(pageTitles)
export default {
  backend: {
    name: "github",
    repo: "pbassham/philbassham.com",
    // identity_url: "https://golden-manatee-569b12.netlify.app/.netlify/identity",
    base_url: "https://golden-manatee-569b12.netlify.app",
    // gateway_url: "https://golden-manatee-569b12.netlify.app/.netlify/git",
    branch: branch, //"master"
  },
  //   load_config_file: false,
  media_folder: "public/assets",
  public_folder: "/assets",
  //   publish_mode: "editorial_workflow",
  display_url: url,
  local_backend: true,
  collections: [
    {
      name: "pages",
      label: "Pages",
      description: "These are pages that will show in the sidebar. Choose a category to group them.",
      label_singular: "Page",
      folder: "content/pages",
      extension: "md",
      format: "frontmatter",
      create: true,
      publish: publish,
      slug: "{{slug}}",
      preview_path: "/{{slug}}",
      identifier_field: "slug",
      summary: "{{title}} [{{fields.category}}]",
      // view_groups: [{ label: "Category", field: "category" }],
      //   view_filters: [{ label: "Drafts", field: "draft", pattern: true }],
      //   sortable_fields: ["title", "date", "sortOrder", "category"],
      fields: [
        {
          name: "title",
          label: "Title",
          widget: "string",
        },
        { name: "excerpt", label: "Excerpt", widget: "string" },
        { name: "date", label: "Date", widget: "date" },
        {
          name: "body",
          label: "Body",
          widget: "markdown",
          hint: `Add your content here.`,
        },
        { name: "coverImage", label: "Cover Image", widget: "file" },
        {
          name: "author",
          label: "author",
          widget: "relation",
          collection: "settings",
          file: "meta",
          search_fields: ["authors.*.name"],
          display_fields: ["authors.*.name"],
          value_field: "authors.*.slug",
        },
        // {
        //   name: "slug",
        //   label: "Slug",
        //   widget: "string",
        //   comment: "Dont change this after page is created.",
        // },

        {
          label: "Tags",
          name: "tags",
          hint: "Add tags to help categorize your content. (Add tags to choose from in Settings > Tags)",
          widget: "relation",
          collection: "settings",
          file: "meta",
          search_fields: ["tags.*.name"],
          display_fields: ["tags.*.name"],
          value_field: "tags.*.slug",
          multiple: true,
          required: false,
          // },
        },
      ],
    },
    {
      name: "posts",
      label: "Posts",
      description: "These are pages that will show in the sidebar. Choose a category to group them.",
      label_singular: "Post",
      folder: "content/posts",
      extension: "md",
      format: "frontmatter",
      create: true,
      publish: publish,
      slug: "{{slug}}",
      preview_path: "/{{slug}}",
      identifier_field: "slug",
      summary: "{{title}} [{{fields.category}}]",
      // view_groups: [{ label: "Category", field: "category" }],
      //   view_filters: [{ label: "Drafts", field: "draft", pattern: true }],
      //   sortable_fields: ["title", "date", "sortOrder", "category"],
      fields: [
        {
          name: "title",
          label: "Title",
          widget: "string",
        },
        { name: "excerpt", label: "Excerpt", widget: "string" },
        { name: "date", label: "Date", format: "YYYY-MM-DD",  time_format: false, widget: "date" },
        {
          name: "body",
          label: "Body",
          widget: "markdown",
          hint: `Add your content here.`,
        },
        { name: "coverImage", label: "Cover Image", widget: "file" },
        {
          name: "author",
          label: "author",
          widget: "relation",
          collection: "settings",
          file: "meta",
          search_fields: ["authors.*.name"],
          display_fields: ["authors.*.name"],
          value_field: "authors.*.slug",
        },
        // {
        //   name: "slug",
        //   label: "Slug",
        //   widget: "string",
        //   comment: "Dont change this after page is created.",
        // },

        {
          label: "Tags",
          name: "tags",
          hint: "Add tags to help categorize your content. (Add tags to choose from in Settings > Tags)",
          widget: "relation",
          collection: "settings",
          file: "meta",
          search_fields: ["tags.*.name"],
          display_fields: ["tags.*.name"],
          value_field: "tags.*.slug",
          multiple: true,
          required: false,
          // },
        },
      ],
    },
    // {
    //   name: "posts",
    //   label: "Posts",
    //   label_singular: "Post",
    //   folder: "content/posts/",
    //   extension: "mdx",
    //   format: "frontmatter",
    //   create: true,
    //   slug: "{{slug}}",
    //   publish: publish,
    //   preview_path: "posts/{{slug}}",
    //   identifier_field: "slug",
    //   summary: "{{title}} ",
    //   // nested: {depth: 4},
    //   view_groups: [{ label: "Category", field: "category" }],
    //   view_filters: [{ label: "Drafts", field: "draft", pattern: true }],
    //   fields: [
    //     {
    //       name: "title",
    //       label: "Title",
    //       widget: "string",
    //     },
    //     // {
    //     //   name: "slug",
    //     //   label: "Slug",
    //     //   widget: "string",
    //     // },
    //     {
    //       name: "date",
    //       label: "Publish Date",
    //       widget: "datetime",
    //       format: "YYYY-MM-DD",
    //       date_format: "YYYY-MM-DD",
    //       time_format: false,
    //     },
    //     // {
    //     //   name: "author",
    //     //   label: "Author",
    //     //   widget: "relation",
    //     //   collection: "meta",
    //     //   file: "authors",
    //     //   search_fields: ["authors.*.name"],
    //     //   display_fields: ["authors.*.name"],
    //     //   value_field: "authors.*.slug",
    //     // },
    //     {
    //       // name: "post tags",
    //       // label: "Post Tags",
    //       // label_singular: "Tag",
    //       // widget: "list",
    //       // summary: "{{fields.tag}}",
    //       // field: {
    //       label: "Tags",
    //       name: "tags",
    //       widget: "relation",
    //       collection: "meta",
    //       file: "tags",
    //       search_fields: ["tags.*.name"],
    //       display_fields: ["tags.*.name"],
    //       value_field: "tags.*.slug",
    //       multiple: true,
    //       required: false,
    //       // },
    //     },
    //     {
    //       // name: "peopleTags",
    //       // label: "People",
    //       // label_singular: "Person",
    //       // widget: "list",
    //       // summary: "{{fields.tag}}",
    //       // field: {
    //       label: "People Involved",
    //       name: "peopleTags",
    //       widget: "relation",
    //       collection: "meta",
    //       file: "tags",
    //       search_fields: ["peopleTags.*.name"],
    //       display_fields: ["peopleTags.*.name"],
    //       value_field: "peopleTags.*.slug",
    //       multiple: true,
    //       required: false,
    //       // },
    //     },
    //     {
    //       // name: "peopleTags2",
    //       // label: "People2",
    //       // label_singular: "Person",
    //       // widget: "select",
    //       // summary: "{{fields.tag}}",
    //       // field: {
    //       label: "Category",
    //       hint: "Select a category. This also determines where the post will be displayed.",
    //       name: "category",
    //       widget: "relation",
    //       collection: "meta",
    //       file: "categories",
    //       search_fields: ["categories.*.name"],
    //       display_fields: ["categories.*.name", "categories.*.description"],
    //       value_field: "categories.*.slug",
    //       required: false,
    //       // multiple: true,
    //       // },
    //     },
    //     {
    //       name: "body",
    //       label: "Body",
    //       widget: "markdown",
    //     },
    //     // {
    //     //   label: "Post Settings",
    //     //   name: "metadata",
    //     //   widget: "object",
    //     //   summary: "Expand to add required data", //"{{fields.name}}: {{fields.birthdate}}",
    //     //   hint: "*Required. Click to expand.",
    //     //   collapsed: true,
    //     //   fields: [
    //     //     {
    //     //       name: "slug",
    //     //       label: "Slug",
    //     //       widget: "string",
    //     //       default: "{{slug}}",
    //     //     },
    //     //     {
    //     //       name: "date",
    //     //       label: "Publish Date",
    //     //       widget: "datetime",
    //     //       format: "YYYY-MM-DD",
    //     //       date_format: "YYYY-MM-DD",
    //     //       time_format: false,
    //     //     },
    //     //     {
    //     //       name: "author",
    //     //       label: "Author",
    //     //       widget: "relation",
    //     //       collection: "meta",
    //     //       file: "authors",
    //     //       search_fields: ["authors.*.name"],
    //     //       display_fields: ["authors.*.name"],
    //     //       value_field: "authors.*.slug",
    //     //     },

    //     //     {
    //     //       name: "post tags",
    //     //       label: "Post Tags",
    //     //       label_singular: "Tag",
    //     //       widget: "list",
    //     //       summary: "{{fields.tag}}",
    //     //       field: {
    //     //         label: "Post Tag",
    //     //         name: "tag",
    //     //         widget: "relation",
    //     //         collection: "meta",
    //     //         file: "tags",
    //     //         search_fields: ["tags.*.name"],
    //     //         display_fields: ["tags.*.name"],
    //     //         value_field: "tags.*.slug",
    //     //       },
    //     //     },
    //     //     {
    //     //       name: "peopleTags",
    //     //       label: "People",
    //     //       label_singular: "Person",
    //     //       widget: "list",
    //     //       summary: "{{fields.tag}}",
    //     //       field: {
    //     //         label: "Person",
    //     //         name: "tag",
    //     //         widget: "relation",
    //     //         collection: "meta",
    //     //         file: "tags",
    //     //         search_fields: ["peopleTags.*.name"],
    //     //         display_fields: ["peopleTags.*.name"],
    //     //         value_field: "peopleTags.*.slug",
    //     //       },
    //     //     },
    //     //     // {
    //     //     //   label: "Public",
    //     //     //   name: "public",
    //     //     //   widget: "boolean",
    //     //     //   default: true,
    //     //     // },
    //     //     // {
    //     //     //   label: "Name",
    //     //     //   name: "name",
    //     //     //   widget: "string",
    //     //     // },
    //     //     // {
    //     //     //   label: "Birthdate",
    //     //     //   name: "birthdate",
    //     //     //   widget: "date",
    //     //     //   default: "",
    //     //     //   format: "MM/DD/YYYY",
    //     //     // },
    //     //     // {
    //     //     //   label: "Address",
    //     //     //   name: "address",
    //     //     //   widget: "object",
    //     //     //   collapsed: true,
    //     //     //   fields: [
    //     //     //     {
    //     //     //       label: "Street Address",
    //     //     //       name: "street",
    //     //     //       widget: "string",
    //     //     //     },
    //     //     //     {
    //     //     //       label: "City",
    //     //     //       name: "city",
    //     //     //       widget: "string",
    //     //     //     },
    //     //     //     {
    //     //     //       label: "Postal Code",
    //     //     //       name: "post-code",
    //     //     //       widget: "string",
    //     //     //     },
    //     //     //   ],
    //     //     // },
    //     //   ],
    //     // },
    //   ],
    // },

    {
      name: "settings",
      label: "Settings",
      label_singular: "Setting",
      description: "General site settings for content organization (tags, categories) and search engine optimization settings (SEO).",
      delete: false,
      extention: "json",
      editor: {
        preview: false,
      },
      files: [
        {
          name: "meta",
          label: "Tags, Categories, Authors (metadata)",
          file: "config/meta.json",
          description: "Author, tags, Categories",
          fields: [
            {
              name: "authors",
              label: "Authors",
              label_singular: "Author",
              widget: "list",
              fields: [
                {
                  label: "Slug",
                  name: "slug",
                  widget: "string",
                  hint: "The part of a URL identifies the author",
                },
                {
                  label: "Name",
                  name: "name",
                  widget: "string",
                  hint: "First and Last",
                },
                {
                  label: "Introduction",
                  name: "introduction",
                  widget: "text",
                },
              ],
            },
            {
              name: "tags",
              label: "Tags",
              label_singular: "Tag",
              widget: "list",
              fields: [
                {
                  label: "Slug",
                  name: "slug",
                  widget: "string",
                  hint: "The part of a URL identifies the tag",
                },
                {
                  label: "Display Name",
                  name: "name",
                  widget: "string",
                  hint: "Tag name for displaying on the site",
                },
              ],
            },
            {
              name: "categories",
              label: "Categories",
              hint: "Heading names for the sidebar. Reordering the list will change the order of the categories on the site sidebar.",
              label_singular: "Category",
              widget: "list",
              summary: "{{fields.name}} {{fields.description}}",
              fields: [
                {
                  label: "Display Name",
                  name: "name",
                  widget: "string",
                  hint: "Category name for displaying on the site",
                },
                {
                  label: "Slug",
                  name: "slug",
                  widget: "string",
                  hint: "The part of a URL identifies the category",
                },
                {
                  description: "Description",
                  name: "description",
                  widget: "text",
                  hint: "Description of category for displaying on the site.",
                  required: false,
                },
                {
                  description: "Hint",
                  name: "hint",
                  widget: "string",
                  hint: "A short description of the category for backend. Wrap in parenthesis for display.",
                  required: false,
                },
              ],
            },
          ],
        },

        {
          name: "Seo settings",
          label: "SEO Settings",
          file: "config/config.json",
          //   create:true,
          description: "General site settings",
          fields: [
            {
              label: "URL",
              name: "base_url",
              widget: "string",
              hint: "Do not enter the trailing slash of the URL",
            },
            {
              label: "Site title",
              name: "site_title",
              widget: "string",
            },
            {
              label: "Site description",
              name: "site_description",
              widget: "string",
            },
            {
              label: "Site keywords",
              name: "site_keywords",
              widget: "list",
              summary: "{{fields.keyword}}",
              fields: [
                {
                  label: "Keyword",
                  name: "keyword",
                  widget: "string",
                },
              ],
            },
            {
              label: "Twitter account",
              name: "twitter_account",
              widget: "string",
              required: false,
            },
            {
              label: "GitHub account",
              name: "github_account",
              widget: "string",
              required: false,
            },
          ],
        },
      ],
    },
  ],
}
