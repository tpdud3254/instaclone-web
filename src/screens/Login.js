import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/auth/SubmitButton";
import Divider from "../components/auth/Divider";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const dividerStyle = {
    margin: "20px 0px 30px 0px",
};

function Login() {
    const { register, watch, handleSubmit, formState } = useForm({
        mode: "onChange",
    });
    //handelSubmit은 두개의 function을 argument로 가진다
    //1. form이 유효한지 확인하는 function(onValid) 호출
    //2. form이 유효하지 않은 지 확인하는 function(onInvalid) 호출

    const onSubmitValid = (data) => {};

    const onSubmiInValid = (data) => {};

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit(onSubmitValid, onSubmiInValid)}>
                    <Input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message:
                                    "Username should be longer than 5 chars.",
                            },
                        })}
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.username?.message)}
                    />
                    <FormError message={formState.errors?.username?.message} />
                    <Input
                        {...register("password", {
                            required: "Password is required",
                        })}
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <FormError message={formState.errors?.password?.message} />
                    <SubmitButton
                        type="submit"
                        value="Log in"
                        disabled={!formState.isValid}
                    />
                </form>
                <Divider style={dividerStyle} />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                link={routes.signUp}
                linkText="Sign up"
            />
        </AuthLayout>
    );
}

export default Login;
