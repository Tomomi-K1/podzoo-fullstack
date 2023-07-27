import React from "react";
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function CategoryCard({category}){
    return(
        <Button sx={{maxWidth: "200px", display:"inline-block", p:1}} >
            <Link to={`/search/${category.name}`} >
                    <Typography variant="body2" color="text.secondary" sx={{fontWeight:'bold'}}>
                        {category.name}
                    </Typography>
            </Link>
        </Button>
    )
}

export default CategoryCard;