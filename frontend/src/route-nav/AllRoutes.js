import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../homepage/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profile/ProfileForm";
import PodcastList from "../podcasts/PodcastList";
import FavoriteList from "../podcasts/FavoriteList";
import ReviewForm from "../reviews/ReviewForm";
import PodcastDetailLayout from "../podcasts/PodcastDetailLayout";
import PodcastReviewList from "../reviews/PodcastReviewList";
import EpisodeList from "../episodes/EpisodeList";


function AllRoutes({signup, logout, login}){
    return (
        <Routes>
            <Route path="/" element={<Layout />} >  
                <Route index element={<Home />} />  
                <Route path="signup" element={<SignupForm />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="user/profile" element={<ProfileForm />} />
                <Route path="search/:term" element={<PodcastList />} />
                <Route path="user/favorites" element={<FavoriteList/>} />
                <Route path="user/review" element={<ReviewForm />} />
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