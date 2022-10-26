import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

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
            comments {
                id
                user {
                    userName
                    avatar
                }
                payload
                isMine
                createdAt
            }
            commentNumber
            createdAt
            isMine
            isLiked
        }
    }
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
