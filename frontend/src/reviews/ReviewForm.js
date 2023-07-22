import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import Alert from "../common/Alert";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Rating from '@mui/material/Rating';
import { TextField } from "@mui/material";



function ReviewForm(){
    const [showPassword, setShowPassword] = useState(false);
    const [rating, setRating] =useState(0);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
        <Container sx ={{
            display:'flex', 
            mt: 10
            // height:'100vh' 
            }}>
           
            <Paper 
                alignItems='center' 
                justifyContent = 'center' 
                elevation={4}
                sx={{
                    p:3,
                    margin: 'auto',
                    maxWidth: '80%',
                    flexGrow: 1
                }}>
            <form>
                <h2>Write Your Review</h2>
                <Rating value={rating} onChange ={(event, newValue) =>{
                    setRating(newValue);
                }}/>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="username">Comment</InputLabel>
                    <OutlinedInput
                        id="username"
                        label="Username"
                        required
                    />
                </FormControl>    
                <Button margin='normal'>Submit</Button>
            </form>
        </Paper>
    
      </Container>
    )
}

export default ReviewForm;