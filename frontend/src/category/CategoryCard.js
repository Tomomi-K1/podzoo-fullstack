import React from "react";
import { Link } from "react-router-dom";
// Material UI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/** CategoryCard
 * Route: used inside homepage('/')
 * receives categories as a prop and create a button with link to Search route where it shows search resutls 
 * component using CategoryCard : CategoryList.js
 */

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