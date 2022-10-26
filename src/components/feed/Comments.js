import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
        createComment(photoId: $photoId, payload: $payload) {
            ok
            error
            id
        }
    }
`;

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

const PostCommentContainer = styled.div`
    margin-top: 10px;
    padding-top: 15px;
    padding-bottom: 10px;
    border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
    width: 100%;
    &::placeholder {
        font-size: 12px;
    }
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
    const { data: userData } = useUser();
    const { register, handleSubmit, setValue, getValues } = useForm();

    const createCommentUpdate = (cache, result) => {
        const { payload } = getValues();
        setValue("payload", "");

        const {
            data: {
                createComment: { ok, id },
            },
        } = result;

        if (ok && userData?.me) {
            const newComment = {
                __typename: "Comment",
                id,
                user: { ...userData.me },
                payload,
                isMine: true,
                createdAt: Date.now() + "",
            };

            //실제로 캐시에 저장해야 나중에 삭제 기능도 만들 수 있음
            // apollo에서는 cache가 데이터베이스라고 생각해야 편함
            const newCacheComment = cache.writeFragment({
                data: newComment,
                fragment: gql`
                    fragment frg on Comment {
                        id
                        createdAt
                        isMine
                        payload
                        user {
                            userName
                            avatar
                        }
                    }
                `,
            });

            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    comments: (prev) => [...prev, newCacheComment],
                    commentNumber: (prev) => prev + 1,
                },
            });
        }
    };

    const [createCommentMutation, { loading }] = useMutation(
        CREATE_COMMENT_MUTATION,
        {
            update: createCommentUpdate,
        }
    );

    const onValid = (data) => {
        const { payload } = data;

        if (loading) {
            return;
        }

        createCommentMutation({
            variables: {
                photoId,
                payload,
            },
        });
    };
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
                    id={comment.id}
                    photoId={photoId}
                    isMine={comment.isMine}
                    author={comment.user.userName}
                    payload={comment.payload}
                />
            ))}
            <PostCommentContainer>
                <form onSubmit={handleSubmit(onValid)}>
                    <PostCommentInput
                        {...register("payload", {
                            required: true,
                        })}
                        type="text"
                        placeholder="write a comment!"
                    />
                </form>
            </PostCommentContainer>
        </CommentsContainer>
    );
}

Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
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
