import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const SEE_FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                userName
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Home() {
    const { data } = useQuery(SEE_FEED_QUERY);

    return (
        <HomeContainer>
            <PageTitle title="home" />
            {data?.seeFeed?.map((photo, index) => (
                <Photo key={index} {...photo} />
            ))}
        </HomeContainer>
    );
}

export default Home;
