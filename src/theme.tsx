import { extendTheme } from "@chakra-ui/react"
// import { createBreakpoints } from "@chakra-ui/theme-tools"
import { withProse } from "@nikolovlazar/chakra-ui-prose"

const fonts = { mono: `'Menlo','Domaine', monospace` }

// const breakpoints = createBreakpoints({
//   sm: "40em",
//   md: "52em",
//   lg: "64em",
//   xl: "80em",
// })

const styles = {
  global: {
    html: {
      height: "-webkit-fill-available",
    },
    body: {
      // padding: 0,
      margin: 0,
      position: "relative",
      minHeight: "100%",
      fontFamily: "'System-ui','Open Sans', sans-serif",
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
    "#nc-root": {
      "[data-slate-editor]": {
        "-webkit-user-modify": "read-write !important;",
      },
      "@media (max-width: 768px)": {
        // backgroundColor: "black",

        "aside.css-1gj57a0-SidebarContainer-card.el9l68m0": {
          position: "static",
          width: "100%",
          marginBottom: "30px",
        },
        ".css-y7r3-AppHeader": { height: "unset" },
        ".css-v758ki-AppMainContainer,\n  .css-12b66la-AppHeaderContent": {
          minWidth: "0",
          flexWrap: "wrap",
        },
        ".css-104dqk8-AppHeaderButton-button-buttonActive-buttonActive-buttonActive-buttonActive-AppHeaderButton,\n  .css-12yqrwa-AppHeaderNavLink-AppHeaderButton-button-buttonActive-buttonActive-buttonActive-buttonActive-AppHeaderButton":
          {
            margin: "0",
            padding: "16px 7px",
          },
        ".css-1f7nhiq-CollectionMain": { paddingLeft: "0" },
        ".css-1hvrgvd-CollectionTopContainer-card-cardTop": { width: "100%" },
        ".css-16b5p1f-ToolbarSectionMain-toolbarSection": {
          flexDirection: "column",
          justifyContent: "space-evenly",
        },
        ".css-1f3mf5k-StyledModal": {
          padding: "15px",
          gridTemplateRows: "190px auto",
        },
        ".css-svjxk-SearchContainer": { display: "block", width: "100%" },
        ".css-smzvtl-LibraryTop": { flexDirection: "column" },
        ".css-3ifd9s-ActionsContainer": { textAlign: "center" },
        ".css-1ih1y1j-LibraryTitle": { marginBottom: "15px" },
        ".css-2ptjc9-UpperActionsContainer": { display: "inline-block" },
        ".css-1qukh7n-DownloadButton-button-default-disabled-button": {
          marginLeft: "0",
          marginRight: "0",
        },
        ".css-13rmovq-StyledUploadButton-button-default-disabled-button-gray": {
          marginLeft: "10px",
        },
        ".css-1hpjyse-DeleteButton-button-default-disabled-button-lightRed": {
          marginTop: "10px",
          marginLeft: "0",
          marginRight: "0",
        },
        ".css-1s67tkf-InsertButton-button-default-disabled-button-green": {
          marginTop: "10px",
          marginLeft: "10px",
        },
        ".css-16796rj-LowerActionsContainer": {
          display: "inline-block",
          marginTop: "0",
        },
        ".css-stmjdx-CardGridContainer": {
          position: "static",
          overflow: "visible",
          width: "100%",
          paddingTop: "20px",
        },
        ".css-hn3jn7-EditorContainer": { minWidth: "0", paddingTop: "120px" },
        ".css-2oej7z-ToolbarContainer": {
          minWidth: "0",
          display: "grid",
          justifyItems: "start",
          height: "unset",
        },
        ".css-abwcjt-ToolbarSectionBackLink-toolbarSection": { padding: "11px 20px" },
        ".css-osnbqe-ToolbarToggle": { flexDirection: "column" },
        "span.Resizer.vertical": { display: "none" },
        ".Pane.vertical.Pane2": { display: "none" },
        ".Pane.vertical.Pane1": { width: "100% !important" },
        ".css-1bqupl5-ViewControls.e1pxf6c47": { display: "none" },
        ".SplitPane.css-7d7n9g-StyledSplitPane-card-splitPane.e1pxf6c41.vertical": {
          display: "block !important",
        },
        ".css-134r1tn-RowContainer.ebn7k121": { display: "block", marginTop: "10px" },
        "button.css-6ekon-ActionButton-button-default-disabled-button.eljtsap3": {
          margin: "0 10px 0 0",
          fontSize: "12px",
          padding: "0 10px",
        },
        ".css-1o58c3b-ButtonsContainer.ebn7k122": {
          textAlign: "left",
          marginTop: "10px",
        },
        "button.css-196hm3u-DeleteButton-button-default-disabled-button-lightRed.eljtsap1": {
          margin: "0 10px 0 0",
        },
        "button.css-d08ild-InsertButton-button-default-disabled-button-green.eljtsap2": {
          marginLeft: "0",
        },
        "button.css-579ih7-ActionButton-button-default-disabled-button-gray-ActionButton.eljtsap3": {
          margin: "0 10px 0 0",
          fontSize: "12px",
          padding: "0 10px",
        },
        "label.nc-fileUploadButton.css-1fb6kv1-UploadButton-button-default-disabled-button-gray.eljtsap0": {
          marginLeft: "0",
        },
      },
    },
  },
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
    styles
  },
  withProse()
)

export default theme
