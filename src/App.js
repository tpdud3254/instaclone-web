import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Routes>
                            <Route
                                path={routes.home}
                                exect
                                element={isLoggedIn ? <Home /> : <Login />}
                            ></Route>
                            {!isLoggedIn ? (
                                <Route
                                    path={routes.signUp}
                                    element={<SignUp />}
                                ></Route>
                            ) : null}
                            <Route path="*" element={<NotFound />}></Route>
                            {/* not found 화면 원할 시 (항상 맨 마지막에 둬야함) */}
                            {/* <Route path="*" element={<Navigate to="/" />} /> redirect원할 시 */}
                        </Routes>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}

export default App;
