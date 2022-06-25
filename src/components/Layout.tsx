import { Box, Center, Container, Divider, Flex, Spacer, Stack, useColorMode, useColorModeValue, Text } from "@chakra-ui/react"
// import Breadcrumbs from "@components/Breadcrumbs"
// import { FrontMatter } from "@lib/posts"
import Head from "next/head"
import { Footer } from "./Footer"
import Header from "./Header"
import { Hero } from "./Hero"
import { Main } from "./Main"
// import NavBar from "./NavBar"
// import Navigation, { Menu } from "./Navigation"
// import TableOfContents from "./TableOfContents"

type Props = {
  children: React.ReactNode
  //   frontMatter?: FrontMatter
}
// export default function Layout({ children }: Props) {
export default function Layout(props: Props) {
  const { children } = props
  //   const { headings } = frontMatter || {}
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <Container height="100vh" maxWidth={'5xl'}>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Container>
    </div>
  )
}
