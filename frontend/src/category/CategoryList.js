import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import CategoryCard from "./CategoryCard";


function CategoryList({categories}){



    return(
        // <Grid container spacing={1} >
        <Container sx={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
        {categories.map(category =>{
            return (
               <div key={category.id}>
                {/* <Grid item xs ={6} md={4} lg={3} sx={{m:'auto'}} > */}
                  <CategoryCard  category={category}/>
                 {/* </Grid> */}
                 </div>
            ) 
        })}
     {/* </Grid> */}
     </Container>
    )
}

export default CategoryList;