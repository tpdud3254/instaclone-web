import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
    const isLoggedIn = true;
    return (
        <div>
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
        </div>
    );
}

export default App;
