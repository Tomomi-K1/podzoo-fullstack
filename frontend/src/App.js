import './App.css';
import React, {useState, useEffect} from 'react';
import { decodeToken} from 'react-jwt';
import { BrowserRouter} from "react-router-dom";
import UserContext from './UserContext';
import Loader from './common/Loader';
import AllRoutes from './route-nav/AllRoutes';
import PodApi from './api/PodApi';
// Material UI
import CssBaseline from '@mui/material/CssBaseline';
import useLocalStorage from './hooks/useLocalStorage';

export const TOKEN_STORAGE_ID = 'pod_token'
// const currentUser = {username:'test1', email:'test1@gmail.com', fav_podcasts:[1, 5718023] };
// const currentUser = null;

export default function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set([]));
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUser(){
    console.debug("App.js useEffect LoadUser ran", currentUser)
    // -----define async func to call backend------
    async function getUserInfo(){
      if(token){
        try{
          let { username } = decodeToken(token);
          PodApi.token = token;
          let currentUser = await PodApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setFavorites(new Set(currentUser.fav_podcasts));
        } catch(err){
          console.error('LoadUser func: problem loading', err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // -----end of define async func to call backend------

    setInfoLoaded(false);
    getUserInfo();
  }, [token])

  /** == handle Sign up ==
   * get new Token
   * change of token will initiate the useEffect which will get currentUser info
   */
  async function signup(signupData){
    try{
      let token = await PodApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch(err){
      console.error("sign up failed", err);
      return { success: false, err};
    }
  }

  /** == handle Login ==
   * get new Token
   * change of token will initiate the useEffect which will get currentUser info
   */
  async function login(loginData){
    try{
      let token = await PodApi.login(loginData);
      setToken(token);
      return {success: true};
    } catch(err){
      console.error("login failed", err);
      return { success: false, err};
    }

  }
   /** == handle Logout ==
   * remove info from 'currentUser'
   * remove 'token' then this will remove localStorage info.
   */
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }
  
  /**if we need to show Loader until we fully update userInfo including when we use 'setCurrentUser'  
   */
  if(!infoLoaded) return <Loader />;

  return (
    <BrowserRouter>
      <UserContext.Provider value ={{currentUser, setCurrentUser}}> 
      {/* <UserContext.Provider>  */}
        <div className='App'>
          <CssBaseline />
          <AllRoutes signup={signup} login={login} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}


