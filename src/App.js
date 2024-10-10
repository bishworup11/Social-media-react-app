import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Feed from "./components/Feed";
import "./App.css";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Profiles from "./components/profile/Profiles";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const auth = useSelector((state) => state.auth.currentUser);
  //console.log(auth);

  return (
    <Router>
      <div
        className={`App _layout _layout_main_wrapper ${
          darkMode ? "_dark_wrapper" : ""
        }`}
      >
        <div >
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/login"
              element={auth ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={
                auth ? (
                  <>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Feed />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                auth ? (
                  <>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Profiles />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


