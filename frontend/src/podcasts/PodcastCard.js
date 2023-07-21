import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function PodcastCard({podcast}){
    console.log(`podcard :${podcast}`)
    return(
        // how do I keep image ratio 1:1?
        <Card sx={{maxWidth: "200px", m:2}} raised={true} className={podcast.id}>
            {/* <CardContent> */}
            <CardMedia
                component="img"
                width= "100%"
                height="auto"
                image={podcast.artwork}
                alt="podcast artwork"
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
        </Card>
    )
}

export default PodcastCard;