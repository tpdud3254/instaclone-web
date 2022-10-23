import styled from "styled-components";
import PropTypes from "prop-types";

const SubmitButton = styled.input`
    border: none;
    margin-top: 12px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0;
    font-weight: 600;
    width: 100%;
    opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

SubmitButton.propTypes = {
    disabled: PropTypes.bool,
};

export default SubmitButton;
