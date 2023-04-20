import { ThemeProvider } from "styled-components";

const theme = {
  default: {
    colors: {
      pureWhite: "#FFFFFF",
      text: "#1E1E1E",
      textSecondary: "#999999",
      background: "#F4EDE7",
      backgroundSecondary: "#EEEEEE",
      button: "#E8E6D9",
      buttonSecondary: "#EBCFC4",
      buttonHover: "#CDD0B9",
      buttonSecondaryHover:"#D8BEB3",

      //TODO: V2
      background: "#f5f5f5",
      // backgroundSecondary: "#a0b6d8",
      // test: "#9ba48e  #1a2a41  #007b7f #1d4739",
    },
    fonts: ["Playfair Display", "serif", "Lato", "sans-serif"],
    fontSizes: {
      xs: "0.6rem",
      s: "0.66rem",
      m: "1rem",
      l: "1.3rem",
      xl: "1.55rem",
      xxl: "1.77rem",
    },
    fontWeights: {
      regular: "400",
      medium: "500",
      semiBold: "600",
    },
    border: {
      normal: `solid .1rem ${({ theme }) => theme.default.colors.text}`,
    },
  },
};

function Theme(props) {
  // import {useTheme} on any page that wants access to theme
  return <ThemeProvider theme={theme} {...props} />;
}

export default Theme;
