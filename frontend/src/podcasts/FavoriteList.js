import React, { useState, useEffect, useContext } from "react";
import PodcastCard from "./PodcastCard";
import UserContext from "../UserContext";
import Loader from "../common/Loader";

import Box from '@mui/material/Box';
import PodApi from "../api/PodApi";
import { Typography } from "@mui/material";
import PodcastList from "./PodcastList";


function FavoriteList(){
    const { currentUser, favorites } = useContext(UserContext);
    const [favPodcasts, setFavPodcast] = useState(null);

    useEffect(function getFavs(){
        async function getFavPods(){
        let res = await PodApi.getFavPodcasts(currentUser.username);
        setFavPodcast(res);
        }
        getFavPods();
    },[currentUser.username])

    if(!favPodcasts) return <Loader />;
    
    console.log(favorites)
    if(favorites.size ===0) return (
        <Typography variant="h6" sx={{pt:'20px'}} >You have no Favorites</Typography>
    ) 

    return(
        <Box sx={{pt: '40px'}}>
            <Typography variant="h6">Your Favorites</Typography>
            <PodcastList podcasts={favPodcasts} />
        </Box>
    )
}

export default FavoriteList;