import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import './App.css';

import {useSelector, useDispatch} from 'react-redux';

function App() {
  
  const  auth=useSelector(state => state.auth.currentUser);
  console.log(auth);

  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={
            auth ? <Navigate to="/feed" /> : <Login />
        } />
          <Route path="/feed" element={
            auth ? <feed /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
