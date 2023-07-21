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


function CategoryCard({category}){
    console.log(`category:${category}`)
    return(
        <Card sx={{maxWidth: "200px", display:"inline-block"}} raised={true} className={category.id}>
            {/* <CardMedia
                component="img"
                height="200px"
                image={podcast.artwork}
                alt="podcast artwork"
            /> */}
                <CardContent>
                    <Typography variant="h6" color="text.secondary" sx={{fontWeight:'bold'}}>
                        {category.name}
                    </Typography>
                </CardContent>
        </Card>
    )
}

export default CategoryCard;