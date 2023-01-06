import { getByCat, getBySlug, getContent } from "@lib/api"
import { GetStaticPaths } from "next"
import Post from "@components/Post"
import { serialize } from "next-mdx-remote/serialize"
import Category from "@components/Category"
import meta from "@root/config/meta.json"
import { DynamicProps, PostType } from "types"
import { getPost, getPosts } from "@lib/github"

export default function Dynamic(props: DynamicProps) {
  const { type, post, allPosts, category } = props
  return <Post post={post} />
  if (type === "page" || type === "post") return <Post post={post} />
  // if (isPost) return <Post post={post} />
  if (type === "category") return <Category allPosts={allPosts} category={category} />
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
    slug: string
    number: number
  }
}

export async function getStaticProps({ params }: Params) {
  // const post = await getPost(params.number)
  const post = await getPost(params.slug[0])
  // const post = await getPost(1)
  // const {content} = post

  // const commentsdata = post ? await getPostComments(params.slug) : [""]
  // const comments = commentsdata ? commentsdata : ["Ooooops 🥺. Couldn't fetch comments. There was an error calling the GitHub Issues API"]
  const content = await serialize(post.content || "")
  // const slug = post ? post.slug : { number: "0"}

  return {
    props: {
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
  const posts = await getPosts()

  const paths = posts.map((post) => {
    return {
      params: {
        number: [post.number],
        // slug: [post.number.toString()],
        slug: [post.slug],
      },
    }
  })
  // :
  // [
  //   {
  //     params: {
  //       slug: ["0"],
  //     },
  //   }
  // ]

  return {
    paths: paths,
    fallback: "blocking",
  }
}
