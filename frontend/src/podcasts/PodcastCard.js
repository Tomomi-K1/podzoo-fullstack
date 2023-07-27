import React from "react";
import { Link } from "react-router-dom";
import {handleImageError} from "../common/helper";
import fallbackImage from "../image/default.jpg";
// Material UI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/** PodcastCard : Stateless
 * shows a podcast info 
 * receives podcast prop
 * component using PodcastCard: PodcastList.js
 */
function PodcastCard({podcast}){
    return(
        <Card sx={{maxWidth: "200px", m:2}}>
            <Link to={`/podcast/${podcast.feedId}`}>
            <CardMedia
                component="img"
                width= "100%"
                height="auto"
                image={podcast.artwork?podcast.artwork:fallbackImage}
                alt="podcast artwork"
                onError={handleImageError}
            />
                <CardContent>
                    <Typography variant="body1" color="text.secondary" sx={{fontWeight:'bold', textDecoration:'none'}}>
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