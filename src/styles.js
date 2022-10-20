import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const lightTheme = { fontColor: "#2c2c2c", bgColor: "white" };

export const darkTheme = { fontColor: "white", bgColor: "#2c2c2c" };

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
        background-color: #FAFAFA;
        font-size: 14px;
        font-family:'Open Sans', sans-serif;
    }

    a {
        text-decoration: none;
    }
`;
