import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import Alert from "../common/Alert";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function LoginForm(){
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
        <Container sx ={{
            display:'flex', 
            mt: 10
            }}>
           
            <Paper 
                alignItems='center' 
                justifyContent = 'center' 
                elevation={4}
                sx={{
                    p:3,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1
                }}>
            <form>
                <h2>Login Form</h2>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        label="Username"
                        required
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        required
                    />
                </FormControl> 
                <Button margin='normal'>Submit</Button>
            </form>
        </Paper>
    
      </Container>
    )
}

export default LoginForm;