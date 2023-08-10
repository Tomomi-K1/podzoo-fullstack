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

// key name for storing token in localStorage
export const TOKEN_STORAGE_ID = 'pod_token'

/** Podcast Search application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 * 
 * - favorite: user's favorite podcast. Using Set data. 
 *
 * App -> Routes
 */

export default function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set([]));
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /** useEffect will run when token changes (user login or logout) 
   * -get token and store it in PodApi
   * -decode token to get username and get a user info from backend
   * - assign current user to currentUser state
   * - assign current user's favorite to favorites state as a set
   */
  useEffect(function loadUser(){
    async function getUserInfo(){
      if(token){
        try{
          let { username } = decodeToken(token);
          PodApi.token = token;
          let currentUser = await PodApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setFavorites(new Set(currentUser.fav));
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
  /** == check a certain podcasts feedId is in user's favorites or not == */
  function checkFavPod(feedId){
    return favorites.has(+feedId);
  }
  /** == handle adding a podcast to favorite ==
   * add podcast to favorite on backend
   * update favorites (set)
   */
  async function likePod(username, feedId, data){
    if(checkFavPod(+feedId)) return;
      try{
          const res =await PodApi.addFavPodcasts(username, feedId, data)
          setFavorites(new Set([...favorites, +feedId]));
      } catch(err){
          console.error(err);
      }
  }
  /** == handle removing a podcast from favorite ==
   * remove podcast to favorite on backend
   * update favorites (set)
   */
  async function removeLike(username, feedId){
    try{
      const res =await PodApi.deleteFavPodcasts(username, feedId);
      favorites.delete(+feedId);
      setFavorites(favorites => new Set([...favorites]));
    } catch (err){
        console.error(err);
    }    
  }

  if(!infoLoaded) return <Loader />;

  return (
    <BrowserRouter>
      <UserContext.Provider value ={{currentUser, setCurrentUser, favorites, likePod, removeLike, checkFavPod}}> 
        <div className='App'>
          <CssBaseline />
          <AllRoutes signup={signup} login={login} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}


