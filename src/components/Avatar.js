import styled from "styled-components";

const SAvatar = styled.div`
    width: ${(props) => (props.lg ? "30px" : "25px")};
    height: ${(props) => (props.lg ? "30px" : "25px")};
    background-color: #2c2c2c;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #cccccc;
`;

const Img = styled.img`
    max-width: 100%;
`;

function Avatar({ url = "", lg = false }) {
    return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}

export default Avatar;
