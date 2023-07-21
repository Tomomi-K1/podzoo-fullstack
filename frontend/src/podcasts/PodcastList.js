import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import PodcastCard from "./PodcastCard";

function PodcastList({podcasts}){
    return(
        <Grid container spacing={1} sx={{flexGrow:1}} justifyContent="center">
            <Grid item xs={12} md={11} lg={10} sx={{ display:"flex", justifyContent:"center", backgroundColor: "grey"}}>
                <Grid container justifyContent="center" spacing={1}>
                    {podcasts.map(podcast =>{
                        return (         
                            <Grid item xs ={5} md={3} lg={2} sx={{display:"flex", justifyContent:"center", backgroundColor:'pink'}}>
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