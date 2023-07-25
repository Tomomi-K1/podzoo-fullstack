import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import CategoryCard from "./CategoryCard";


function CategoryList({categories}){



    return(
        // <Grid container spacing={1} >
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
    //     <Container sx={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
    //     {categories.map(category =>{
    //         return (
    //            <div key={category.id}>
    //             {/* <Grid item xs ={6} md={4} lg={3} sx={{m:'auto'}} > */}
    //               <CategoryCard  category={category}/>
    //              {/* </Grid> */}
    //              </div>
    //         ) 
    //     })}
    //  {/* </Grid> */}
    //  </Container>
    )
}

export default CategoryList;