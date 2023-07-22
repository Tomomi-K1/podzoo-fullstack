import './App.css';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import UserContext from './UserContext';
import AllRoutes from './route-nav/AllRoutes';
import Home from './homepage/Home';
import SignupForm from './auth/SignupForm';
import CssBaseline from '@mui/material/CssBaseline';
import { getImageListItemBarUtilityClass } from '@mui/material';

const currentUser = {username:'test1', email:'test1@gmail.com', fav_podcasts:[1, 5718023] };
// const currentUser = null;

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


