import styled from "styled-components";
import { BaseBox } from "../common";

const Container = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin-top: 30px;
        /* input {
        width: 100%;
        border-radius: 3px;
        padding: 7px;
        background-color: #fafafa;
        border: 0.5px solid rgb(219, 219, 219);
        margin-top: 5px;
        box-sizing: border-box; //테두리를 포함해서 크기를 계산 (width, height)
        &::placeholder {
            //&:부모선택자, :: 가상요소
            font-size: 12px;
        }
        &:last-child {
            // : 가상 클래스 , 부모 요소의 마지막 항목을 대상
            border: none;
            margin-top: 12px;
            background-color: ${(props) => props.theme.accent};
            color: white;
            text-align: center;
            padding: 8px 0;
            font-weight: 600;
        }
    } */
    }
`;

function FormBox({ children }) {
    return <Container> {children}</Container>;
}

export default FormBox;
