import React, { useState, useEffect } from "react";
import PodcastCard from "./PodcastCard";
// Material UI
import Grid from '@mui/material/Grid';

/** PodcastList : stateless
 * receives podcasts as a prop
 * shows list of podcasts using PodcastCard
 * component using PodcastList: Home, SearchResults, FavoriteList
 */
function PodcastList({podcasts}){
    return(
        // add hover effect
        <Grid container spacing={1} sx={{flexGrow:1}} justifyContent="center">
            <Grid item xs={12} md={11} lg={10} sx={{ display:"flex", justifyContent:"center"}}>
                <Grid container justifyContent="center" spacing={1}>
                    {podcasts.map(podcast =>{
                        return (         
                            <Grid key={podcast.feedId} item xs ={5} md={3} lg={2} sx={{display:"flex", justifyContent:"center"}}>
                                <PodcastCard podcast={podcast} />
                            </Grid>
                        
                        )})
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PodcastList;