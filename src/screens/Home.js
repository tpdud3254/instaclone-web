import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";

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

function Home() {
    const { data } = useQuery(SEE_FEED_QUERY);

    return (
        <div>
            {data?.seeFeed?.map((photo) => (
                <Photo key={photo.id} {...photo} />
            ))}
        </div>
    );
}

export default Home;
