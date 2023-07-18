import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import Alert from "../common/Alert";
import Paper from '@mui/material/Paper';
import { Box, Button, Container, FormControl, FormLabel, Grid, TextField, autocompleteClasses, dividerClasses, OutlinedInput, InputAdornment, FormHelperText, InputLabel, IconButton, FilledInput, Input} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function SignupForm(){
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
        <Container display='flex' height ='100vh' alignItems='center'>
           
            <Paper 
                alignItems='center' 
                justifyContent = 'center' 
                elevation={4}
                sx={{
                    p:3,
                    margin: 'auto',
                    maxWidth: 400,
                    flexGrow: 1
                }}>
            <form>
                <h2>Signup Form</h2>
                <Box size ='large'>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <TextField type='text' required='true' size='large'/>
                    </FormControl>
                </Box>
                <div>
                    <FormControl>
                        <FormLabel>password</FormLabel>
                        <TextField type='password' />
                    </FormControl>
                </div>
                <div>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <TextField type='email'/>
                </FormControl>
                </div>
                <div>
                <Button margin='normal'>Submit</Button>
                </div>
            </form>
        </Paper>
    
      </Container>
    )
}

export default SignupForm;