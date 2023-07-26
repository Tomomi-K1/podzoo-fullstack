import React, { useState, useContext } from "react";
import PodApi from "../api/PodApi";
import UserContext from "../UserContext";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import ShowAlert from "../common/ShowAlert";
// import Alert from "../common/Alert";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Rating from '@mui/material/Rating';

function ReviewForm(){
    const {currentUser} = useContext(UserContext);
    const{reviews, setReviews} =useOutletContext();
    const navigate = useNavigate();
    const {feedid} = useParams();
    const [rating, setRating] =useState(0);
    const [formData, setFormData] = useState({
        rating: 0,
        comment:''
    });
    const [formErrors, setFormErrors] = useState([]);
    console.debug('reviews', reviews)
    async function handleSubmit(evt){
        evt.preventDefault();
        console.log(`did this run?`)
        try{
            let res = await PodApi.addReviews(currentUser.username, feedid, formData);
            console.debug('ReviewForm: handleSubmit', res);
            let updatedReviews = await PodApi.getReviews(feedid);
            setReviews(updatedReviews)
            return navigate(`../reviews`);
        } catch(err){
            console.error(err);
            setFormErrors(err);
        }
    }

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
        }
    console.log(formData);
    return (
        <Container sx ={{
            display:'flex', 
            mt: 10
            // height:'100vh' 
            }}>
           
            <Paper
                elevation={4}
                sx={{
                    p:3,
                    margin: 'auto',
                    maxWidth: '80%',
                    flexGrow: 1,
                    alignItems:'center',
                    justifyContent:'center' 
                }}>
            <form onSubmit={handleSubmit}>
                <h2>Write Your Review</h2>
                <Rating name="rating" value={formData.rating} onChange ={handleChange}/>
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="comment">Comment</InputLabel>
                    <OutlinedInput
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        label="comment"
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

export default ReviewForm;