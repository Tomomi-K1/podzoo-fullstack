import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../homepage/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profile/ProfileForm";
import SearchResult from "../podcasts/SearchResult";
import PodcastList from "../podcasts/PodcastList";
import FavoriteList from "../podcasts/FavoriteList";
import ReviewForm from "../reviews/ReviewForm";
import PodcastDetailLayout from "../podcasts/PodcastDetailLayout";
import PodcastReviewList from "../reviews/PodcastReviewList";
import EpisodeList from "../episodes/EpisodeList";


function AllRoutes({signup, logout, login}){
    return (
        <Routes>
            <Route path="/" element={<Layout logout={logout} />} >  
                <Route index element={<Home />} />  
                <Route path="signup" element={<SignupForm signup = {signup} />} />
                <Route path="login" element={<LoginForm login ={login} />} />
                <Route path="user/profile" element={<ProfileForm />} />
                <Route path="search/:term" element={<SearchResult />} />
                <Route path="user/favorites" element={<FavoriteList/>} />
                <Route path="podcast/:feedid" element={<PodcastDetailLayout />} >
                    <Route index element={<EpisodeList />} />
                    <Route path="reviews" element={<PodcastReviewList />} />
                    <Route path="reviews/form" element ={<ReviewForm />} />
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