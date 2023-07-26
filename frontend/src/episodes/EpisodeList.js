import React, { useState, useEffect } from "react";
import {useOutletContext} from 'react-router-dom';
import EpisodeCard from './EpisodeCard';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**show list of episode. nest EpisodeCard */

function EpisodeList(){
    const{count, episodes, link} =useOutletContext()
    console.debug('episodeList')
    console.log(count, episodes)
    return(
        // add hover effect
        <Box sx ={{pt:5}}>
            <List>
            <Typography variant='body2' sx={{p:4}}>Number of Episodes shown here is {count}. For more episode and details, visit <a href={link} target="_blank">Podcast Homepage</a></Typography>
          
            <Grid container spacing={1} sx={{flexGrow:1}} justifyContent="center">
                <Grid item xs={12} md={9} lg={7} sx={{ display:"flex", justifyContent:"center", flexDirection: 'column'}}>
                    {episodes.map(episode =>{
                        return (  
                            <ListItem key={episode.id}>    
                            <EpisodeCard  episode={episode} />
                            </ListItem>   
                        )})
                    }
                </Grid>
            </Grid>
            </List>
        </Box>
        
    )
}

export default EpisodeList;