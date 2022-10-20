import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        exect
                        element={isLoggedIn ? <Home /> : <Login />}
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                    {/* not found 화면 원할 시 (항상 맨 마지막에 둬야함) */}
                    {/* <Route path="*" element={<Navigate to="/" />} /> redirect원할 시 */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
