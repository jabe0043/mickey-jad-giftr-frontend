import { ThemeProvider } from "styled-components";

const theme = {
  default: {
    colors: {
      text: "#1E1E1E",
      textSecondary: "#999999",
      background: "#F4EDE7",
      backgroundSecondary: "#EEEEEE",
      button: "#E8E6D9",
      buttonSecondary: "#EBCFC4",
    },
    fonts: ["Playfair Display", "serif"],
    fontSizes: {
      sm: "0.9rem",
      md: "1.2rem",
      ls: "2rem",
      xl: "5rem",
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