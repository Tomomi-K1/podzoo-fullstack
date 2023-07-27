import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../common/ShowAlert";
// Material UI 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/** Login form
 * Route : ('/login')
 * Shows form and error manages
 * On submission:
 * - calls login function prop
 * - redirects to homepage ('/') route
 */

function LoginForm({login}){
    // ---material UI password setting related ---
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    // ---end of material UI password setting related ---

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })
    const [formErrors, setFormErrors] = useState([]);

    /**== handle submit login form ==
     * calls login function prop
     * if successful, redirect to home('/')
    */
    async function handleSubmit(evt){
        evt.preventDefault();
        let res =await login(formData);
        console.debug('handleSubmit', res)
        if(res.success){
            return navigate("/")
        } else{
            console.log(res.err)
            setFormErrors(res.err);
        }
    }

    /** == Update form data field as user type in  ==*/
    function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
    }
    
    return (
        <Container sx ={{display:'flex', mt: 10}}>
            <Paper 
                elevation={4}
                sx={{
                    p:3,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    alignItems:'center', 
                    justifyContent:'center' 
                }}>
            <form onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        label="Username"
                        required
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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
                {formErrors.length?
                <Box sx={{m: 1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                <ShowAlert type ='error' messages={formErrors} />
                </Box>
                : null}
                <Button type='submit' margin='normal' >Submit</Button>  
            </form>    
        </Paper>            
      </Container>
    )
}

export default LoginForm;