import PropTypes from "prop-types";
import {
    faBookmark,
    faComment,
    faHeart,
    faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../common";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const TOGGLE_LIEK_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;
const PhotoContainer = styled.div`
    background-color: ${(props) => props.theme.feedBgColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 60px;
    max-width: 615px;
    border-radius: 4px;
    width: 100%;
`;

const PhotoHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`;

const PhotoData = styled.div`
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }

    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
`;

const Likes = styled(FatText)`
    display: block; //FatText가 styled.span이라서 기본적으로 inline 속성을 가지기 때문에 block해줘야함
    margin-top: 15px;
`;

function Photo({
    id,
    user,
    file,
    isLiked,
    likes,
    caption,
    comments,
    commentNumber,
}) {
    //fragment를 사용하는 방법
    /* const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;

        //cache에 있는 데이터를 사용할때
        if (ok) {
            const fragmentId = `Photo:${id}`;
            const fragment = gql`
                fragment frg on Photo {
                    isLiked
                    likes
                }
            `;

            const result = cache.readFragment({
                id: fragmentId,
                fragment,
            });

            if ("isLiked" in result && "likes" in result) {
                const { isLiked: cacheIsLiked, likes: cacheLikes } = result;

                cache.writeFragment({
                    id: fragmentId,
                    fragment,
                    data: {
                        isLiked: !cacheIsLiked,
                        likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
                    },
                });
            }
        }
        
        //props를 사용하는 방법
        if (ok) {
            cache.writeFragment({
                //writeFragment : cache에서 내가 원하는 특정 object의 일부분을 수정하는 작업
                id: `Photo:${id}`,
                fragment: gql`
                    fragment bsname on Photo {
                        isLiked
                    }
                `,
                data: {
                    isLiked: !isLiked,
                },
            });
        }
        
    };  */

    //cache.modify를 사용하는 방법 (apollo client 3에서 제공)
    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;

        //cache에 있는 데이터를 사용할때
        if (ok) {
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev, { readField }) {
                        if (readField("isLiked")) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                    //React 의 porps가 업데이트가 안되는 경우가 있습니다.
                    //cache.modify 의 field 조건문에 readField 를 사용하여 캐시에서 데이터를 읽어주세요.
                },
            });
        }
    };

    const [toggleLikeMutation, { loading, data }] = useMutation(
        TOGGLE_LIEK_MUTATION,
        {
            variables: {
                id,
            },
            update: updateToggleLike,
        }
    );

    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Link to={`/users/${user.userName}`}>
                    <Avatar lg url={user.avatar} />
                </Link>
                <Link to={`/users/${user.userName}`}>
                    <Username>{user.userName}</Username>
                </Link>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                            <FontAwesomeIcon
                                style={{
                                    color: isLiked ? "tomato" : "inherit",
                                }} //inherit: 부모 속성 그대로 받아옴
                                size={"2x"}
                                icon={isLiked ? SolidHeart : faHeart}
                            />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon size={"2x"} icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
                        </PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon size={"2x"} icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                <Comments
                    photoId={id}
                    author={user.userName}
                    caption={caption}
                    commentNumber={commentNumber}
                    comments={comments}
                />
            </PhotoData>
        </PhotoContainer>
    );
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired,
    }),
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    caption: PropTypes.string,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            user: PropTypes.shape({
                userName: PropTypes.string.isRequired,
                avatar: PropTypes.string,
            }),
            payload: PropTypes.string.isRequired,
            isMine: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ),
    commentNumber: PropTypes.number.isRequired,
};

export default Photo;
