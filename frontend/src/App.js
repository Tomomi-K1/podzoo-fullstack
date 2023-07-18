import './App.css';
import React from 'react';
import Home from './homepage/Home';
import SignupForm from './auth/SignupForm';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <SignupForm />
    </div>
  );
}


