import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../common";

const Box = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        color: ${(props) => props.theme.accent};
        margin-left: 5px;
    }
`;

function BottomBox({ cta, link, linkText }) {
    return (
        <Box>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </Box>
    );
}

export default BottomBox;
