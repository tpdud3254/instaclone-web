import styled from "styled-components";

const SInput = styled.input`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: #fafafa;
    border: 0.5px solid ${(props) => props.theme.borderColor};
    margin-top: 5px;
    box-sizing: border-box; //테두리를 포함해서 크기를 계산 (width, height)
    &::placeholder {
        //&:부모선택자, :: 가상요소
        font-size: 12px;
    }
`;

function Input(props) {
    return <SInput {...props} />;
}

export default Input;
