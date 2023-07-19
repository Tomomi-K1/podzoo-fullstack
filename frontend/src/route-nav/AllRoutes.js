import React from "react";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "../homepage/Home";
import SignupForm from "../auth/SignupForm"
import LoginForm from "../auth/LoginForm"

function AllRoutes(props){
    return (
        <Routes>
            <Route element={<Layout />} />  
                <Route path="/" element={<Home/>} />  
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                {/* if not route matches then it will show homepage.
                    this route acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
                <Route path="*" element={<Home />} />
        </Routes>
    );
}

export default AllRoutes;