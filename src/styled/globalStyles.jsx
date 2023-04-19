import { createGlobalStyle } from "styled-components";

// This approach allows us to use Theme properties

export const GlobalStyle = createGlobalStyle`
:root {
    font-family: ${({ theme }) => theme.default.fonts[1]};
    line-height: 1.5;
    font-weight: ${({ theme }) => theme.default.fontWeights.regular};

    color:${({ theme }) => theme.default.colors.text};
    background-color: ${({ theme }) => theme.default.colors.background};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}

/* Box sizing rules */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Set core root defaults */
html {
    line-height: 1.5;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

html:focus-within {
    scroll-behavior: smooth;
}

/* Set core body defaults */
body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    margin: 0;
}

/* Update default margin */
h1,
h2,
h3,
h4,
h5,
h6,
figure,
blockquote,
ul,
ol,
dl,
dd {
    margin: 0 0 1.5rem;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
    list-style: none;
}

/* A elements that don't have a class get default styles */
a {
    text-decoration-skip-ink: auto;
    color: ${({ theme }) => theme.default.colors.text};
    transition: color 0.2s;
}

a:hover,
a:focus-visible {
    cursor: pointer;
    color: ${({ theme }) => theme.default.colors.textSecondary};
}

/* Make images easier to work with */
img,
picture {
    max-width: 90%;
    // display: block;
}

svg {
    fill: currentColor;
}

svg:not(:root) {
    overflow: hidden;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
    font: inherit;
}

header{
    width:100vw;
    display: flex;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
    html:focus-within {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        /* animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important; */
        scroll-behavior: auto !important;
    }
}

// TODO: added by jad
h1{
    margin:0;
}

p{
    margin:0;
}

.container {
    width: min(65em, 100%);
    margin: 0 auto;
    padding-left: .75rem;
    padding-right: .75rem;
}

.bi{
    font-size: 1.5rem;
    color: ${({ theme }) => theme.default.colors.text};
}

// + icon in header
.bi-plus{
    font-size: 2rem;
    font-weight: 600;
}

// back Arrow icon in header
.bi-backArrow{
    font-size: 2rem;
    font-weight: 600;
}

.save{
    background-color: ${({ theme }) => theme.default.colors.button};
}

.delete{
    background-color: ${({ theme }) => theme.default.colors.buttonSecondary};
}



`;
