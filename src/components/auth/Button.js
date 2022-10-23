import styled from "styled-components";

const Button = styled.button`
    border: none;
    margin-top: 12px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0;
    font-weight: 600;
    width: 100%;
`;

export default Button;
