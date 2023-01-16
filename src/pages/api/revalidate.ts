export default async function handler(req, res) {
  try {
    const { slug, secret } = req.query
    // Check for secret to confirm this is a valid request
    if (!secret || secret !== process.env.REVALIDATE_TOKEN) {
      return res.status(401).json({ message: "Invalid token" })
    }

    if (!slug) throw `No Slug provided`
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(`/${slug}`)
    // await res.revalidate(`/`) // update home page to include new posts
    // await res.revalidate(`/projects`) // update category page
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err)

    return res.status(500).send(`Error revalidating. ${err}`)
  }
}
