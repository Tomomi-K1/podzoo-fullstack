import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../homepage/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profile/ProfileForm";
import SearchResult from "../podcasts/SearchResult";
import FavoriteList from "../podcasts/FavoriteList";
import ReviewForm from "../reviews/ReviewForm";
import PodcastDetailLayout from "../podcasts/PodcastDetailLayout";
import ReviewList from "../reviews/ReviewList";
import EpisodeList from "../episodes/EpisodeList";
import EditReviewForm from "../reviews/EditReviewForm";
import ProtectedRoute from "./ProtectedRoute";

/** Site-wide routes.
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <ProtectedRoute>, which is an authorization component.
 * Visiting a non-existent route redirects to the homepage.
 */
function AllRoutes({signup, logout, login}){
    return (
        <Routes>
            <Route path="/" element={<Layout logout={logout} />} >  
                <Route index element={<Home />} />  
                <Route path="signup" element={<SignupForm signup = {signup} />} />
                <Route path="login" element={<LoginForm login ={login} />} />
                <Route path="search/:term" element={<SearchResult />} />
                <Route path="user/profile" 
                       element={
                            <ProtectedRoute>
                                <ProfileForm />
                            </ProtectedRoute>
                            } 
                />
                <Route path="user/favorites" 
                       element={
                        <ProtectedRoute>
                            <FavoriteList/>
                       </ProtectedRoute>
                       } 
                />
                <Route path="podcast/:feedid" element={<PodcastDetailLayout />} >
                    <Route index element={<EpisodeList />} />
                    <Route path="reviews" element={<ReviewList />} />
                    <Route path="reviews/form" 
                           element ={
                            <ProtectedRoute>
                                <ReviewForm />
                            </ProtectedRoute>
                           } 
                    />
                    <Route path="reviews/:reviewid/edit" 
                           element ={
                            <ProtectedRoute>
                                <EditReviewForm />
                            </ProtectedRoute>
                            } 
                    />
                </Route>
                <Route path="*" element={<Home />} />
                {/* if not route matches then it will show homepage.
                this route acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            </Route>
        </Routes>
    );
}

export default AllRoutes;