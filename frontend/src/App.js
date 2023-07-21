import './App.css';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import UserContext from './UserContext';
import AllRoutes from './route-nav/AllRoutes';
import Home from './homepage/Home';
import SignupForm from './auth/SignupForm';
import CssBaseline from '@mui/material/CssBaseline';

// const currentUser = {username:'Tomomi'};
const currentUser = null;

export default function App() {

  function signup(){
    
  }
  function login(){

  }
  function logout(){

  }

  return (
    <BrowserRouter>
      <UserContext.Provider value ={{currentUser}}> 
      {/* <UserContext.Provider>  */}
        <div className='App'>
          <CssBaseline />
          <AllRoutes signup={signup} login={login} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}


