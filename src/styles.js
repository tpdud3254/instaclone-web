import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    borderColor: "rgb(219, 219, 219)",
    bgColor: "#FAFAFA",
    fontColor: "rgb(38,38,38)",
};

export const darkTheme = {
    accent: "#0095f6",
    borderColor: "rgb(219, 219, 219)",
    bgColor: "rgb(38,38,38)",
    fontColor: "#FAFAFA",
};

//global style - body 전체에 적용
export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset //input에 적용된 기본 스타일 리셋
    }

    * { // * 는 전체 요소에 적용됨
        box-sizing: border-box;
    }

    body {
        background-color:${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.fontColor}
    }

    a {
        text-decoration: none;
    }
`;
