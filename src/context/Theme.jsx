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
  },
};

function Theme(props) {
  // import {useTheme} on any page that wants access to theme
  return <ThemeProvider theme={theme} {...props} />;
}

export default Theme;
