import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: center;
`;

const WhiteBox = styled.div`
    background-color: white;
    border: 1.3px solid rgb(219, 219, 219);
    width: 100%;
`;

const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin-top: 30px;
        input {
            width: 100%;
            border-radius: 3px;
            padding: 7px;
            background-color: #fafafa;
            border: 0.5px solid rgb(219, 219, 219);
            margin-top: 5px;
            box-sizing: border-box; //테두리를 포함해서 크기를 계산 (width, height)
            &::placeholder {
                //&:부모선택자, :: 가상요소
                font-size: 12px;
            }
            &:last-child {
                // : 가상 클래스 , 부모 요소의 마지막 항목을 대상
                border: none;
                margin-top: 12px;
                background-color: #0095f6;
                color: white;
                text-align: center;
                padding: 8px 0;
                font-weight: 600;
            }
        }
    }
`;

const BottomBox = styled(WhiteBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        color: #0095f6;
    }
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

const Separator = styled.div`
    margin: 20px 0px 30px 0px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* flex-direction: column; */
    div {
        width: 100%;
        height: 1px;
        background-color: rgb(219, 219, 219);
    }
    span {
        margin: 0 10px;
        font-weight: 600;
        color: #8e8e8e;
    }
`;

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login() {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <input type="submit" value="Log in" />
                    </form>
                    <Separator>
                        <div></div>
                        <span>Or</span>
                        <div></div>
                    </Separator>
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <span>Log in with Facebook</span>
                    </FacebookLogin>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span> <a href="#">Sign up</a>
                </BottomBox>
            </Wrapper>
        </Container>
    );
}

export default Login;
