import React from "react";
// Material UI
import Grid from '@mui/material/Grid';
import CategoryCard from "./CategoryCard";

/** CategoryList
 * Route : used in homepage('/')
 * renders CategoryCard components and show it as a list
 * component using CategoryList : Home.js
 */
function CategoryList({categories}){
    return(
        <Grid container spacing={1} sx={{flexGrow:1}} justifyContent="center">
            <Grid item xs={12} md={11} lg={10} sx={{ display:"flex", justifyContent:"center"}}>
                <Grid container justifyContent="center" spacing={1}>
                {categories.map(category =>{
                    return (
                    <Grid item key={category.id} xs ={3} md={1} lg={1} sx={{p:1}} >
                        <CategoryCard  category={category}/>
                    </Grid>
                    ) 
                })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CategoryList;