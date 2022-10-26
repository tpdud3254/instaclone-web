import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
    margin-top: 15px;
`;

const CommentCount = styled.span`
    opacity: 0.5;
    display: block;
    margin: 10px 0px;
    font-weight: 600;
    font-size: 12px;
`;

function Comments({ author, caption, commentNumber, comments }) {
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption} />
            <CommentCount>
                {commentNumber === 1
                    ? "1 comment"
                    : `${commentNumber} comments`}
            </CommentCount>
            {comments?.map((comment, index) => (
                <Comment
                    key={index}
                    author={comment.user.userName}
                    payload={comment.payload}
                />
            ))}
        </CommentsContainer>
    );
}

Comments.propTypes = {
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            user: PropTypes.shape({
                avatar: PropTypes.string,
                userName: PropTypes.string.isRequired,
            }),
            payload: PropTypes.string.isRequired,
            isMine: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ),
};
export default Comments;
