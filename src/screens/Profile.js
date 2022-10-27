import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import { FatText } from "../components/common";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";

//쿼리에 Id를 추가하지 않아서 캐시에 추가되지 않는 현상이 발생
//apoll.js InMemoryCache에 keyFields를 추가하면 고유 식별자를 바꿀수있음
const SEE_PROFILE_QUERY = gql`
    query seeProfile($userName: String!) {
        seeProfile(userName: $userName) {
            firstName
            lastName
            userName
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($userName: String!) {
        followUser(userName: $userName) {
            ok
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($userName: String!) {
        unfollowUser(userName: $userName) {
            ok
        }
    }
`;

const Header = styled.div`
    display: flex;
`;

const Column = styled.div``;

const Row = styled.div`
    margin-bottom: 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
`;

const Avatar = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-color: #2c2c2c;
    margin-left: 50px;
    margin-right: 150px;
`;

const Username = styled.h3`
    font-size: 28px;
    font-weight: 400;
`;

const Item = styled.span`
    margin-right: 20px;
`;
const Value = styled(FatText)`
    font-size: 18px;
    margin-right: 5px;
`;

const Name = styled(FatText)`
    font-size: 20px;
`;
const Grid = styled.div`
    display: grid;
    grid-auto-rows: 290px;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
`;
const Photo = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    position: relative; //상대경로 (relative, absolute 안써도 똑같은데 왜쓰느지 모르겠음)
`;
const Icons = styled.div`
    position: absolute; //position 속성이 static이 아닌 첫 번째 상위 요소가 해당 요소의 배치 기준으로 설정
    //따라서 어떤 요소의 display 속성을 absolute로 설정하면, 부모 요소의 display 속성을 relative로 지정해주는 것이 관례입니다.
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;
const Icon = styled.span`
    display: flex;
    align-items: center;
    font-size: 18px;
    margin: 0 5px;
    svg {
        font-size: 14px;
        margin-right: 5px;
    }
`;

const NotFoudUser = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    margin-top: 100px;
`;

const ProfileBtn = styled(Button).attrs({
    as: "span",
})`
    margin-left: 10px;
    margin-top: 0px;
    cursor: pointer;
`;

function Profile() {
    const { userName } = useParams();
    const { data: userData } = useUser();
    const client = useApolloClient();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            userName,
        },
    });

    //update 반환값인 cache를 사용
    const unfollowUserUpdate = (cache, result) => {
        const {
            data: {
                unfollowUser: { ok },
            },
        } = result;

        if (!ok) {
            return;
        }

        cache.modify({
            id: `User:${userName}`,
            fields: {
                isFollowing: () => false,
                totalFollowers: (prev) => prev - 1,
            },
        });

        const { me } = userData;

        cache.modify({
            id: `User:${me.userName}`,
            fields: {
                totalFollowing: (prev) => prev - 1,
            },
        });
    };
    const [unfollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables: {
            userName,
        },
        update: unfollowUserUpdate,
    });

    //onCompleted 반환값에는 cache가 없으므로 apollo client를 사용해 cache사용
    const followUserCompleted = (data) => {
        const {
            followUser: { ok },
        } = data;

        if (!ok) {
            return;
        }

        const { cache } = client;

        cache.modify({
            id: `User:${userName}`,
            fields: {
                isFollowing: () => true,
                totalFollowers: (prev) => prev + 1,
            },
        });

        const { me } = userData;

        cache.modify({
            id: `User:${me.userName}`,
            fields: {
                totalFollowing: (prev) => prev + 1,
            },
        });
    };

    const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {
            userName,
        },
        onCompleted: followUserCompleted,
    });
    //update와 onCompleted는 둘다 동작이 끝난 후 실행이 되는데 리턴값이 다름

    const getButton = (seeProfile) => {
        const { isMe, isFollowing } = seeProfile;

        if (isMe) {
            return <ProfileBtn>Edit Profile</ProfileBtn>;
        }

        if (isFollowing) {
            return (
                <ProfileBtn onClick={unfollowUserMutation}>Unfollow</ProfileBtn>
            );
        } else {
            return <ProfileBtn onClick={followUserMutation}>Follow</ProfileBtn>;
        }
    };
    return (
        <div>
            <PageTitle
                title={
                    loading
                        ? "Loading..."
                        : data?.seeProfile
                        ? `${data?.seeProfile?.userName}'s Profile`
                        : "Not found user :("
                }
            />

            {data?.seeProfile ? (
                <>
                    <Header>
                        <Avatar src={data?.seeProfile?.avatar} />
                        <Column>
                            <Row>
                                <Username>
                                    {data?.seeProfile?.userName}
                                </Username>
                                {data?.seeProfile
                                    ? getButton(data.seeProfile)
                                    : null}
                            </Row>
                            <Row>
                                <Item>
                                    <Value>
                                        {data?.seeProfile?.totalFollowers}
                                    </Value>
                                    followers
                                </Item>
                                <Item>
                                    <Value>
                                        {data?.seeProfile?.totalFollowing}
                                    </Value>
                                    following
                                </Item>
                            </Row>
                            <Row>
                                <Name>
                                    {data?.seeProfile?.firstName}{" "}
                                    {data?.seeProfile?.lastName}
                                </Name>
                            </Row>
                            <Row>{data?.seeProfile?.bio}</Row>
                        </Column>
                    </Header>
                    <Grid>
                        {data?.seeProfile?.photos.map((photo, index) => (
                            <Photo key={index} bg={photo.file}>
                                <Icons>
                                    <Icon>
                                        <FontAwesomeIcon icon={faHeart} />
                                        {photo.likes}
                                    </Icon>
                                    <Icon>
                                        <FontAwesomeIcon icon={faComment} />
                                        {photo.commentNumber}
                                    </Icon>
                                </Icons>
                            </Photo>
                        ))}
                    </Grid>
                </>
            ) : (
                <NotFoudUser>⚠️ NOT FOUND USER ⚠️</NotFoudUser>
            )}
        </div>
    );
}

export default Profile;
