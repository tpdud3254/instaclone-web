import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragments";

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

function Profile() {
    const { userName } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            userName,
        },
    });

    console.log(data);
    return <>{userName}</>;
}

export default Profile;
