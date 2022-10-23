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
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $userName: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            userName: $userName
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`;
function SingUp() {
    const navigate = useNavigate();

    const onCompleted = (data) => {
        const {
            createAccount: { ok, error },
        } = data;

        if (!ok) {
            return;
        }

        navigate(routes.home);
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const { register, handleSubmit, formState } = useForm({ mode: "onChange" });

    const onSubmiValid = (data) => {
        if (loading) {
            return;
        }

        createAccount({
            variables: {
                ...data,
            },
        });
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
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
                <form onSubmit={handleSubmit(onSubmiValid)}>
                    <Input
                        {...register("firstName", {
                            required: "First Name is required.",
                        })}
                        type="text"
                        placeholder="First Name"
                    />
                    <Input
                        {...register("lastName")}
                        type="text"
                        placeholder="Last Name"
                    />
                    <Input
                        {...register("email", {
                            required: "email is required.",
                        })}
                        type="text"
                        placeholder="Email"
                    />
                    <Input
                        {...register("userName", {
                            required: "User Name is required.",
                        })}
                        type="text"
                        placeholder="Username"
                    />
                    <Input
                        {...register("password", {
                            required: "Password is required.",
                        })}
                        type="password"
                        placeholder="Password"
                    />
                    <LearnMoreText>
                        People who use our service may have uploaded your
                        contact information to Instagram.{" "}
                        <span>Learn More</span>
                    </LearnMoreText>
                    <SubmitButton
                        type="submit"
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
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
