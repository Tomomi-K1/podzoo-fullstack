import './App.css';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import UserContext from './UserContext';
import AllRoutes from './route-nav/AllRoutes';
import Home from './homepage/Home';
import SignupForm from './auth/SignupForm';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  return (
    <BrowserRouter>
      {/* <UserContext.Provider value ={{ currentUser, setCurrentUser }}>  */}
      <UserContext.Provider> 
        <div className='App'>
          <CssBaseline />
          <AllRoutes />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}


