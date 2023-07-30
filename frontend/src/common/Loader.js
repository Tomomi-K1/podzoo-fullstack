import React from "react";
import './Loader.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Loader(){
    return(
        <Container sx={{height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Box sx={{display:'flex', justifyContent: "center", width:'25%', alignItems:'center'}}>
                <i className="fa-solid fa-otter fa-beat-fade"></i>
                <i className="fa-solid fa-compact-disc"></i>
                <i className="fa-solid fa-hippo fa-beat-fade"></i>
                <i className="fa-solid fa-compact-disc"></i>
                <i className="fa-solid fa-cow fa-beat-fade"></i>
            </Box>
                <p class='loading'>Loading...</p>
        </Container>
    );
}

export default Loader;