import React from "react"; //create-react-app에서 기본적으로 제공해줘서 따로 import를 해주지 않아도 됐던거였음
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../common";
import sanitizeHtml from "sanitize-html";
import { Link } from "react-router-dom";
import routes from "../../routes";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
    margin-left: 10px;

    a {
        background-color: inherit;
        color: ${(props) => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

function Comment({ author, payload }) {
    /* 
    이렇게 하면 태그를 리액트 컴포넌트로 감쌀 수 없음. 하지만 유용하게 쓰일듯..
    const cleanedPayload = sanitizeHtml(
        payload?.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>") || "", //payload없을 경우 방어코드 추가
        { allowedTags: ["mark"] } //현재는 sanitize-html의 default.allowedTags를 보면 mark와 p 모두 포함되어 있기 때문에 영상처럼 mark를 따로 allowedTags에 포함해줄 필요는 없을 것 같아요.
    );

    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption
                dangerouslySetInnerHTML={{ __html: cleanedPayload }}
            />
        </CommentContainer>
    ); */
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption>
                {payload?.split(" ").map((word, index) =>
                    /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
                        <React.Fragment key={index}>
                            <Link to={`${routes.hasgtags}/${word}`}>
                                {word}
                            </Link>{" "}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}> {word} </React.Fragment>
                    )
                )}
            </CommentCaption>
        </CommentContainer>
    ); //TODOS: @사용자이름 기능도 추가하기
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string,
};
export default Comment;
