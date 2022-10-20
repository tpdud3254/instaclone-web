import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/auth/SubmitButton";
import Divider from "../components/auth/Divider";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import styled from "styled-components";
import { FatLink } from "../components/common";
import Button from "../components/auth/Button";

const HeadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Subtitle = styled(FatLink)`
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    line-height: 20px;
`;

const FacebookLoginButton = styled(Button)`
    span {
        font-size: 14px;
        margin-left: 10px;
    }
`;

const deviderStyle = {
    margin: "20px 0px -15px 0px",
};

const LearnMoreText = styled.span`
    color: rgb(142, 142, 142);
    font-size: 12px;
    line-height: 17px;
    margin: 20px 0px 10px 0px;
    text-align: center;
    span {
        font-weight: 600;
    }
`;

function SingUp() {
    return (
        <AuthLayout>
            <FormBox>
                <HeadContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>
                        Sign up to see photos and videos from your friends.
                    </Subtitle>
                    <FacebookLoginButton>
                        <FontAwesomeIcon icon={faFacebookSquare} size="xl" />
                        <span>Log in with Facebook</span>
                    </FacebookLoginButton>
                </HeadContainer>
                <Divider style={deviderStyle} />
                <form>
                    <Input type="text" placeholder="Mobile Number or Email" />
                    <Input type="text" placeholder="Full Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <LearnMoreText>
                        People who use our service may have uploaded your
                        contact information to Instagram.{" "}
                        <span>Learn More</span>
                    </LearnMoreText>
                    <SubmitButton type="submit" value="Sign up" />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an account?"
                link={routes.home}
                linkText="Log in"
            />
        </AuthLayout>
    );
}

export default SingUp;
