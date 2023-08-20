import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../common/ShowAlert";
import PodApi from "../api/PodApi";
// Material UI
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

/** ProfileForm
 * Route: "user/profile"
 * -shows form with currentUser's info in it
 * -update user info and redirect to home after 3 seconds
 */
function ProfileForm(){
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        email: currentUser.email
    })
    const [isSaved, setIsSaved] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    /**== handle submit profile form ==
     * calls backend to updateUserEmil
     * it also update currentUser
     * if successful, redirect to home
    */
     async function handleSubmit(evt){
        evt.preventDefault();
        let username = formData.username;
        let newEmail = formData.email
        try{
            await PodApi.updateProfile(username, {email:newEmail});
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
                return navigate("/");

            }, 3000)
            
        } catch(err){
            console.log(err)
            setFormErrors(err);
            setIsSaved(false);
        }
        setFormData( f=> ({...f, email:newEmail}))
        setFormErrors([]);
        setCurrentUser(user => ({...user, email:newEmail}))
    }

    /** == Update form data field  ==*/
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    return (
        <Container sx ={{
            display:'flex', 
            mt: 10
            // height:'100vh' 
            }}>
           
            <Paper 
                elevation={4}
                sx={{
                    alignItems:'center',
                    justifyContent:'center',
                    p:3,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1
                }}>
            <form onSubmit={handleSubmit}>
                <h2> User Profile </h2>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        name="username"
                        value={formData.username}
                        label="Username"
                        disabled
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
                {formErrors.length
                  ? <ShowAlert type="error" messages={formErrors} />
                  : null}

              {isSaved?
                  <ShowAlert type="success" messages={["Updated successfully."]} />
                  : null}  
                <Button type ='submit' margin='normal'>Submit</Button>
            </form>
        </Paper>
    
      </Container>
    )
}

export default ProfileForm;