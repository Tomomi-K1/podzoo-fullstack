import React from "react";
import { Link } from "react-router-dom";
import {handleImageError} from "../common/helper";
import fallbackImage from "../image/default.jpg";
// Material UI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/** PodcastCard : Stateless
 * shows a podcast info 
 * receives podcast prop
 * component using PodcastCard: PodcastList.js
 */

const theme = createTheme();

theme.typography.body1 = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
};

theme.typography.body2 = {
    fontSize: '0.7rem',
    '@media (min-width:600px)': {
      fontSize: '0.85rem',
    },
  };


const cardSX = {
    maxWidth: "200px", 
    m:2,
    "&:hover" :{
        boxShadow:8
    }
}

function PodcastCard({podcast}){
    return(
        <Card sx={cardSX}>
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
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" color="text.secondary" sx={{fontWeight:'bold', textDecoration:'none'}}>
                        {podcast.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {podcast.author}
                    </Typography>
                </ThemeProvider>
                </CardContent>
            </Link>
        </Card>
        
    )
}

export default PodcastCard;