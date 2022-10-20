import styled from "styled-components";

const Button = styled.input`
    border: none;
    margin-top: 12px;
    border-radius: 3px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0;
    font-weight: 600;
    width: 100%;
`;

function SubmitButton(props) {
    return <Button {...props} />;
}

export default SubmitButton;
