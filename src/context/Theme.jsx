import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

const FontSizeIncreaseRateInPercentage = 10;
const theme = {
  default: {
    colors: {
      //TODO: V2
      white: "#F5F5F5",
      text: "#1E1E1E",
      textSecondary: "#999999",

      // primary: "#c0aede",
      primary: "#80c9e0",
      secondary: "#b6e3f4",
      bgOptions: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],

      backgroundSecondary: "#F5F5F5",

      button: "#d1d4f9",
      buttonHover: "#b6e3f4",
      // button: "#b6e3f4",
      // buttonHover: "#80c9e0",
      buttonSecondary: "#ff8c85",
      buttonSecondaryHover: "#ffb3b3",
    },
    fonts: ["Poppins, Playfair Display", "serif", "Lato", "sans-serif"],
    fontSizes: {
      xs: "0.78rem",
      s: "1.1rem",
      m: "1.3rem",
      l: "1.733rem",
      xl: "1.85rem",
      xxl: "2.02rem",
    },
    fontWeights: {
      regular: "400",
      medium: "500",
      semiBold: "600",
    },
    margins: {
      regular: ".5rem",
    },
    layout: {
      cardColumnCount: "2",
    },
  },
};

function Theme(props) {
  const [themeState, setThemeState] = useState(theme);

  const handleWindowResize = () => {
    if (window.innerWidth < 400) {
      // screen width < 400
      let fontSizes = { ...themeState.default.fontSizes };
      Object.keys(fontSizes).forEach((key) => {
        const originalValue = Number(fontSizes[key].replace("rem", ""));
        fontSizes[key] = (originalValue * (1 - FontSizeIncreaseRateInPercentage / 100)).toString() + "rem";
      });

      // console.log("newFontSizes", newFontSizes);
      setThemeState({
        ...themeState,
        default: {
          ...themeState.default,
          fontSizes: fontSizes,
          layout: {
            ...themeState.default.layout,
            cardColumnCount: "1",
          },
        },
      });
    } else if (window.innerWidth < 700) {
      // 400px < screen width < 700px
      setThemeState({
        ...themeState,
        default: {
          ...themeState.default,
          layout: {
            ...themeState.default.layout,
            cardColumnCount: "2",
          },
        },
      });
    } else {
      // 700px < screen width

      let fontSizes = { ...themeState.default.fontSizes };
      Object.keys(fontSizes).forEach((key) => {
        const originalValue = Number(fontSizes[key].replace("rem", ""));
        fontSizes[key] = (originalValue * (1 + FontSizeIncreaseRateInPercentage / 100)).toString() + "rem";
      });

      setThemeState({
        ...themeState,
        default: {
          ...themeState.default,
          fontSizes: fontSizes,
          layout: {
            ...themeState.default.layout,
            cardColumnCount: "3",
          },
        },
      });
    }
  };

  useEffect(() => {
    // console.log("Theme.jsx useEffect");
    window.addEventListener("resize", (ev) => handleWindowResize());
  }, []);

  // import {useTheme} on any page that wants access to theme
  return <ThemeProvider theme={themeState} {...props} />;
}

export default Theme;
