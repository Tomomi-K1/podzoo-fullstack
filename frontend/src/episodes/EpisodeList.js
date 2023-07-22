import React, { useState, useEffect } from "react";
import {useOutletContext} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EpisodeCard from './EpisodeCard';
/**show list of episode. nest EpisodeCard */

function EpisodeList(){
    const{count, episodes, link} =useOutletContext()
    console.debug('episodeList')
    console.log(count, episodes)
    return(
        // add hover effect
        <Box sx ={{pt:5}}>
            <Typography variant='body2' sx={{p:4}}>Number of Episodes shown here is {count}. For more episode, visit <a href={link} target="_blank">Podcast Homepage</a></Typography>
          
            <Grid container spacing={1} sx={{flexGrow:1}} justifyContent="center">
                <Grid item xs={12} md={11} lg={10} sx={{ display:"flex", justifyContent:"center"}}>
                    <Grid container justifyContent="center" spacing={1}>
                        {episodes.map(episode =>{
                            return (         
                                <Grid key={episode.id} item xs ={5} md={3} lg={2} sx={{display:"flex", justifyContent:"center"}}>
                                    <EpisodeCard episode={episode} />
                                </Grid>
                            
                            )})
                        }
                    </Grid>
                </Grid>
            </Grid>
            
        </Box>
        
    )
}

export default EpisodeList;