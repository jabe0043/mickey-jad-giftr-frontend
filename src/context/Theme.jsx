import { ThemeProvider } from "styled-components";

const theme = {
  default: {
    colors: {
      // pureWhite: "#FFFFFF",
      // text: "#1E1E1E",
      // textSecondary: "#999999",
      // background: "#F4EDE7",
      // backgroundSecondary: "#EEEEEE",
      // button: "#E8E6D9",
      // buttonSecondary: "#EBCFC4",
      // buttonHover: "#CDD0B9",
      // buttonSecondaryHover:"#D8BEB3",


        //TODO: V2
      white: "#EEEEEE",
      text: "#1E1E1E",
      textSecondary: "#999999",

      // primary: "#1C3E35",
      primary: "#6A5ACD",
      secondary: "#F9A77F",
      bgOptions: ["5B9883", "99F2D1", "84D4B7", "6FB69D", "5B9883"],
      bgOptions: ["f0eafc", "d8e5fa", "c0e1f9", "a9dcf7", "91d7f5"],
      bgOptions: ["F2A2C2", "AEE8CB", "FEE6A7", "D1C8E2", "F9A77F"],
      bgOptions: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],


      backgroundSecondary: "#EEEEEE",


      button: "#E8E6D9",
      buttonSecondary: "#EBCFC4",
      buttonHover: "#CDD0B9",
      buttonSecondaryHover:"#D8BEB3",
    },
    fonts: ["Poppins, Playfair Display", "serif", "Lato", "sans-serif"],
    fontSizes: {
      xs: "0.78rem",
      s: "1.01rem",
      m: "1.3rem",
      l: "1.733rem",
      xl: "1.55rem",
      xxl: "2.02rem",
    },
    fontWeights: {
      regular: "400",
      medium: "500",
      semiBold: "600",
    },
  },
};


function Theme(props) {
  // import {useTheme} on any page that wants access to theme
  return <ThemeProvider theme={theme} {...props} />;
}

export default Theme;
