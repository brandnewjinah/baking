import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html {
        width: 100%;
        height: 100%;
    }
`;

export default GlobalStyle;
