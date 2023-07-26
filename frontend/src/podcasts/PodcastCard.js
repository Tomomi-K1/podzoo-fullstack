import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import handleImageError from "../common/handleImageError";
// Material UI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function PodcastCard({podcast}){
    
    // const handleImageError = (e) => {
    //     e.target.onerror = null;
    //     e.target.src = fallbackImg;
    // }
     
    return(
        // how do I keep image ratio 1:1?
        
        <Card sx={{maxWidth: "200px", m:2}} raised>
            <Link to={`/podcast/${podcast.feedId}`}>
            {/* <CardContent> */}
            <CardMedia
                component="img"
                width= "100%"
                height="auto"
                image={podcast.artwork}
                alt="podcast artwork"
                onError={handleImageError}
            />
            {/* </CardContent> */}
                <CardContent>
                    <Typography variant="body1" color="text.secondary" sx={{fontWeight:'bold'}}>
                        {podcast.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {podcast.author}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
        
    )
}

export default PodcastCard;