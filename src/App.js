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
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // console.log(darkMode);

  const auth = useSelector((state) => state.auth.currentUser);
  //console.log(auth);

  return (
    <Router>
      <div className={`App _layout _layout_main_wrapper ${darkMode ? '_dark_wrapper' : ''}`}>

        <div className="_main_layout">
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
                    <Navbar 
                     darkMode={darkMode}
                     setDarkMode={setDarkMode}
                    />
                    <Feed />
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
