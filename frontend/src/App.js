import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from "./component/NavBar";
import SignUp from "./pages/SignUp";
import Login from './pages/Login';
import { useAuthContext } from './Hooks/useAuthContext';


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            {/* if user navigate to home page if not navigate to login page */}
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />}
            />

            {/* if user not logged in navigate to login page, if user logged in navigate to home page */}
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}
            />

            {/* if user not logged in navigate to signup page, if user logged in navigate to home page */}
            <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />}
            />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
