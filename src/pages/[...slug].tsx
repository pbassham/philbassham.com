// import { getByCat, getBySlug, getContent } from "@lib/api"
import { GetStaticPaths } from "next"
import Post from "@components/Post"
import Category from "@components/Category"
import meta from "@root/config/meta.json"
import { DynamicProps, Label, PostType } from "types"
import { getLabels, getPost, getPosts } from "@lib/github"
import { MDXComponents } from "@components/MDXComponents"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
import PostList from "@components/PostList"

export default function Dynamic(props: DynamicProps) {
  const { type, post, allPosts, category, source } = props
  // return <Post post={post} />
  return <>{type === "category" ? <Category allPosts={allPosts} category={category} /> : <Post post={post} />}</>
  // if (type === "page" || type === "post") return <Post post={post} />
  // if (isPost) return <Post post={post} />
  // if (content) return <MDXRemote {...content} components={MDXComponents} />
  // if (type === "category") return <Category allPosts={allPosts} category={category} source={source} />
}

// export const getStaticProps = async ({ params }) => {
//   const { slug } = params

//   const isCategory = slug.length === 1 && meta.categories.some((cat) => cat.slug === slug[0])
//   const isPage = !isCategory && slug.length === 1
//   const isPost = !isCategory && !isPage

//   // Category Index Page
//   if (isCategory) {
//     const allPosts = getByCat("posts", slug[0])
//     const category = meta.categories.filter((cat) => cat.slug === slug[0])?.[0]
//     return {
//       props: { type: "category", allPosts, category },
//     }
//   }
//   let post: PostType = null
//   if (isPage) post = getBySlug("pages", slug[0])
//   if (isPost) post = getBySlug("posts", slug[1])
//   // const post = isPage ?  : isPost ? getBySlug("posts", slug[1]) : null
//   const content = await serialize(post.content)
//   return {
//     props: {
//       type: isPage ? "page" : isPost ? "post" : null,
//       post: {
//         ...post,
//         content,
//       },
//     },
//   }
// }

// export const getStaticPathsX: GetStaticPaths = async () => {
//   const posts = getContent("posts")
//   const pages = getContent("pages")
//   const all = [...posts, ...pages]
//   // const posts = getByCat("posts",)

//   const paths = all.map((post) => {
//     const slug = post.category ? [post.category, post.slug] : [post.slug]
//     return {
//       params: {
//         slug,
//       },
//     }
//   })
//   const catPaths = meta.categories.map((cat) => ({ params: { slug: [cat.slug] } }))
//   // const catPath = { params: { slug: ["projects"] } }
//   return {
//     paths: [...catPaths, ...paths],
//     fallback: true,
//   }
// }

type Params = {
  params: {
    slug: string[]
    // number: number
  }
}

export async function getStaticProps({ params }: Params) {
  const labels = await getLabels()
  const { slug } = params

  // const isCategory = slug.length === 1 && meta.categories.some((cat) => cat.slug === slug[0])
  const isCategory = slug.length === 1 && labels.some((label) => label.name === slug[0])
  const isPage = !isCategory && slug.length === 1
  const isPost = !isCategory && !isPage

  // Category Index Page
  if (isCategory) {
    // const allPosts = getByCat("posts", slug[0])
    const allPosts = await getPosts([slug[0]])
    const category = labels.filter((label) => label.name === slug[0])?.[0]
    const catPage = await getPost(category.name)
    const content = catPage?.content ? await serialize(catPage.content) : null
    // if (catPage) {
    // const cat =
    // category.content = await serialize(catPage.content)
    // category =
    // }
    return {
      props: {
        type: "category",
        allPosts,
        category: {
          ...category,
          ...catPage,
          content,
        },
        // post: {
        //   ...catPage,
        //   content,
        // },
        // source: catPage ? await serialize(catPage.content) : null,
      },
      revalidate: 10,
    }
  }
  // let post: PostType = null
  // if (isPage) post = getBySlug("pages", slug[0])
  // if (isPost) post = getBySlug("posts", slug[1])
  // const post = isPage ?  : isPost ? getBySlug("posts", slug[1]) : null
  // const content = await serialize(post.content)

  // const post = await getPost(params.number)
  const post: PostType = await getPost(slug[0])
  // const post = await getPost(1)
  // const {content} = post

  // const commentsdata = post ? await getPostComments(params.slug) : [""]
  // const comments = commentsdata ? commentsdata : ["Ooooops 🥺. Couldn't fetch comments. There was an error calling the GitHub Issues API"]
  const content = await serialize(post?.content || "")
  // const slug = post ? post.slug : { number: "0"}

  return {
    props: {
      type: isPage ? "page" : "post",
      post: {
        ...post,
        content,
        // comments,
        // slug
      },
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(["post"])

  const paths = posts.map((post) => {
    return {
      params: {
        // number: [post.number],
        // slug: [post.number.toString()],
        slug: [post.slug],
      },
    }
  })

  return {
    paths: paths,
    fallback: "blocking",
  }
}
