import styled from "styled-components";

const Separator = styled.div`
    margin: ${(props) =>
        props.style?.margin ? props.style.margin : "10px 0px 10px 0px"};
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* flex-direction: column; */
    div {
        width: 100%;
        height: 1px;
        background-color: ${(props) => props.theme.borderColor};
    }
    span {
        margin: 0 10px;
        font-weight: 600;
        color: #8e8e8e;
        font-size: 13px;
    }
`;

function Divider(props) {
    return (
        <Separator {...props}>
            <div></div>
            <span>Or</span>
            <div></div>
        </Separator>
    );
}

export default Divider;
