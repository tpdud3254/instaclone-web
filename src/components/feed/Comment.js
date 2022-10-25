import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../common";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
    margin-left: 10px;
`;

function Comment({ author, payload }) {
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption>{payload}</CommentCaption>
        </CommentContainer>
    );
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string,
};
export default Comment;
