import { gql, useQuery } from "@apollo/client";
import {
    faBookmark,
    faComment,
    faHeart,
    faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/common";

const SEE_FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                userName
                avatar
            }
            file
            caption
            likes
            comments
            createdAt
            isMine
            isLiked
        }
    }
`;

const PhotoContainer = styled.div`
    background-color: ${(props) => props.theme.feedBgColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 60px;
    max-width: 615px;
    border-radius: 4px;
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
function Home() {
    const { data } = useQuery(SEE_FEED_QUERY);

    console.log(data);
    return (
        <div>
            {data?.seeFeed?.map((photo) => (
                <PhotoContainer key={photo.id}>
                    <PhotoHeader>
                        <Avatar lg url={photo.user.avatar} />
                        <Username>{photo.user.userName}</Username>
                    </PhotoHeader>
                    <PhotoFile src={photo.file} />

                    <PhotoData>
                        <PhotoActions>
                            <div>
                                <PhotoAction>
                                    <FontAwesomeIcon
                                        style={{
                                            color: photo.isLiked
                                                ? "tomato"
                                                : "inherit",
                                        }} //inherit: 부모 속성 그대로 받아옴
                                        size={"2x"}
                                        icon={
                                            photo.isLiked ? SolidHeart : faHeart
                                        }
                                    />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon
                                        size={"2x"}
                                        icon={faComment}
                                    />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon
                                        size={"2x"}
                                        icon={faPaperPlane}
                                    />
                                </PhotoAction>
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    size={"2x"}
                                    icon={faBookmark}
                                />
                            </div>
                        </PhotoActions>
                        <Likes>
                            {photo.likes === 1
                                ? "1 like"
                                : `${photo.likes} likes`}
                        </Likes>
                    </PhotoData>
                </PhotoContainer>
            ))}
        </div>
    );
}

export default Home;
