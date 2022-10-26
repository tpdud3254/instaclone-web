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
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";

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

const Notification = styled.div`
    color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            ok
            token
            error
        }
    }
`;

function Login() {
    const location = useLocation();
    const {
        register,
        watch,
        handleSubmit,
        formState,
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange", //TODOS: 이거 무슨 역할인지 까먹음
        defaultValues: {
            userName: location?.state?.userName || "",
            password: location?.state?.password || "",
        },
    });
    //handelSubmit은 두개의 function을 argument로 가진다
    //1. form이 유효한지 확인하는 function(onValid) 호출
    //2. form이 유효하지 않은 지 확인하는 function(onInvalid) 호출

    const onCompleted = (data) => {
        const {
            login: { ok, error, token },
        } = data;

        if (!ok) {
            return setError("result", {
                message: error,
            });
        }

        if (token) {
            logUserIn(token);
        }
    };

    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });

    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        const { userName, password } = getValues();

        login({
            variables: { userName, password },
        });
    };

    const onSubmiInValid = (data) => {};

    const clearLoginErrors = () => {
        clearErrors("result");
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                {location?.state?.message ? (
                    <Notification>location?.state?.message </Notification>
                ) : null}
                <form onSubmit={handleSubmit(onSubmitValid, onSubmiInValid)}>
                    <Input
                        {...register("userName", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message:
                                    "Username should be longer than 5 chars.",
                            },
                        })}
                        onFocus={clearLoginErrors}
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.userName?.message)}
                    />
                    <FormError message={formState.errors?.userName?.message} />
                    <Input
                        {...register("password", {
                            required: "Password is required",
                        })}
                        onFocus={clearLoginErrors}
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <FormError message={formState.errors?.password?.message} />
                    <SubmitButton
                        type="submit"
                        value={loading ? "Loading..." : "Log in"}
                        disabled={!formState.isValid || loading}
                    />
                    <FormError message={formState.errors?.result?.message} />
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
