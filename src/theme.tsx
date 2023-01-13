import { extendTheme } from "@chakra-ui/react"
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools"
import { withProse } from "@nikolovlazar/chakra-ui-prose"

const fonts = { mono: `'Domaine','Menlo','Domaine', monospace` }

// const breakpoints = createBreakpoints({
//   sm: "40em",
//   md: "52em",
//   lg: "64em",
//   xl: "80em",
// })

const styles = {
  global: (props: StyleFunctionProps) => ({
    html: {
      height: "-webkit-fill-available",
    },
    body: {
      // padding: 0,
      margin: 0,
      position: "relative",
      minHeight: "100%",
      fontFamily: "'System-ui','Open Sans', sans-serif",
      bg: mode("white", "#1f2028")(props),
      //   backgroundColor: "white",
    },

    "*": {
      boxSizing: "border-box",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: "20px",
      border: "3px solid rgba(102, 102, 102, 0.6)",
    },

    "*::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: "4px",
    },
  }),
}
const theme = extendTheme(
  {
    semanticTokens: {
      colors: {
        text: {
          default: "#16161D",
          _dark: "#ade3b8",
        },
        heroGradientStart: {
          default: "#7928CA",
          _dark: "#e3a7f9",
        },
        heroGradientEnd: {
          default: "#FF0080",
          _dark: "#fbec8f",
        },
      },
      radii: {
        button: "12px",
      },
    },
    colors: {
      black: "#16161D",
    },
    fonts,
    // breakpoints,
    styles,
  },
  withProse()
)

export default theme
