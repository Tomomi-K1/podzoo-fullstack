import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../common/ShowAlert";
import Loader from "../common/Loader";
// material UI
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

/** Signup form.
 * Route: '/signup'
 * Shows form and manages update to formData state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to home ('/') route
 */
function SignupForm({signup}){
    // ---material UI pssword setting related ---
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    // ---end of material UI pssword setting related ---

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username:'',
        password:'',
        email:''
    })
    const [formErrors, setFormErrors] = useState([]);

    /**== handle submit signup form ==
     * calls signup function prop (update token => trigger useEffect on App.js to assign currentUser)
     * if successful, redirect to home
     * if error, assign errors to FormErrors state
    */
    async function handleSubmit(evt){
        evt.preventDefault();
        setIsLoading(true);
        let res =await signup(formData);
        if(res.success){
            return navigate("/")
        } else{
            console.log(res.err)
            setFormErrors(res.err);
            setIsLoading(false);
        }
    }

    /** == Update form data field  ==*/
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    if(isLoading){
        return <Loader />;
    }

    return (
        <Container sx ={{
            display:'flex', 
            mt: 10
            }}>
           
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
                <h2>Signup Form</h2>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
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
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                        required
                    />
                </FormControl>
                {formErrors.length?
                <Box sx={{m: 1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                <ShowAlert type ='error' messages={formErrors} />
                </Box>
                : null}    
                <Button type='submit' margin='normal'>Submit</Button>
            </form>
        </Paper>
    
      </Container>
    )
}

export default SignupForm;