import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: #fafafa;
    border: 0.5px solid
        ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
    margin-top: 5px;
    box-sizing: border-box; //테두리를 포함해서 크기를 계산 (width, height)
    &::placeholder {
        //&:부모선택자, :: 가상요소
        font-size: 12px;
    }
    &:focus {
        border-color: rgb(38, 38, 38);
    }
`;

export default Input;
