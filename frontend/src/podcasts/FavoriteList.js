import React, { useState, useEffect, useContext } from "react";
import PodcastCard from "./PodcastCard";
import UserContext from "../UserContext";

import Grid from '@mui/material/Grid';
import PodApi from "../api/PodApi";
import { Typography } from "@mui/material";

function FavoriteList(){
    const { currentUser } = useContext(UserContext);
    const favorites = currentUser.fav_podcasts;

    useEffect(function getFavs(){
        // async function getFavPods(){
        // let res = await PodApi.getFavPodcasts(currentUser.username)
        // }
    })
    
    if(!favorites) return <Typography>You have no Favorites</Typography>

    return(
        // add hover effect
        <Grid container spacing={1} sx={{flexGrow:1}} justifyContent="center">
            <Grid item xs={12} md={11} lg={10} sx={{ display:"flex", justifyContent:"center"}}>
                <Grid container justifyContent="center" spacing={1}>
                   
                    {favorites.map(favPodcast =>{
                        return (         
                            <Grid key={favPodcast.feedId} item xs ={5} md={3} lg={2} sx={{display:"flex", justifyContent:"center"}}>
                                <PodcastCard podcast={favPodcast} />
                            </Grid>
                        
                        )})
                    }
                 
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FavoriteList;