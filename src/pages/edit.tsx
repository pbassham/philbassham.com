import dynamic from "next/dynamic"
// import config from "../../lib/config.yml"
// import config from '../../../public/admin/config.yml'
import config from "../../config/netlifyCMSconfig"
// import CMS from "netlify-cms-app"
import { useContext, useEffect, useState } from "react"
import Script from "next/script"
// import Head from "next/head"
// import { useRouter } from "next/router"
// import { AuthContext } from "@context/authContext"
import { Box } from "@chakra-ui/react"
// import { CMS } from "netlify-cms-core"

// import  CMS  from "netlify-cms-app"
// import netlifyIdentity from "netlify-identity-widget"
// const config = {
//  YOUR_CMS_CONFIG
// };
// CMS.registerPreviewStyle("/styles.css")
// CMS.init({ config })
// CMS.init()
const Admin: React.FC = () => {
//   const { user, login, logout } = useContext(AuthContext)

  const [showPublish, setShowPublish] = useState(false)
  const [useConfig, setUseConfig] = useState(config)

  const CMS = dynamic(
    // @ts-ignore
    () =>
      //@ts-ignore
      import("netlify-cms-app").then((cms: CMS) => {
        // console.log(config.backend.branch)
        useConfig.collections.forEach((collection) => (collection.publish = showPublish))
        //@ts-ignore
        cms.init({ config: useConfig })
        // cms.NetlifyCmsApp.init({ config })
      }),
    {
      ssr: false,
      // loading: () => <p>Loading Admin...</p>
    }
  )
//   useEffect(() => {
//     // console.log("user", user)
//     !user ? login() : null
//     const isAdmin = user?.roles?.includes("admin") || false
//     // console.log("isAdmin", isAdmin)
//     if (isAdmin) {
//       setShowPublish(true)
//       // router.reload()
//     }
//   }, [user])
  return (
    <>
      <Script
        id="init-netlify-identity"
        onError={(e) => {
          console.error("Script failed to load", e)
        }}
      ></Script>
      {/* <Box className="netlify-modal"> */}
        <CMS />
      {/* </Box> */}
    </>
  )
}
export default Admin
