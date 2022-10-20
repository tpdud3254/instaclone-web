import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const lightTheme = {};

export const darkTheme = {};

//global style - body 전체에 적용
export const GlobalStyles = createGlobalStyle`
    body {
        ${reset}
    }
`;
