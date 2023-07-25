import React from "react";
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function CategoryCard({category}){
    return(
        <Card sx={{maxWidth: "200px", display:"inline-block"}} raised={true}>
            <Link to={`/search/${category.name}`} >
                <CardContent>
                    <Typography variant="h6" color="text.secondary" sx={{fontWeight:'bold'}}>
                        {category.name}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    )
}

export default CategoryCard;