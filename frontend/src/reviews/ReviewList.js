import React, { useContext } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import PodApi from "../api/PodApi";
import UserContext from "../UserContext";
import MessageToLogin from "../common/MessageToLogin";
import moment from 'moment';
// Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



/** ReviewList
 * This page shows:
 * - Podcast detailed Information
 * - Rating
 * - List of Episode 
 * - User likes or not
 * */

function ReviewList(){
    const {currentUser} = useContext(UserContext);
    const{reviews, setReviews} =useOutletContext();
    const { feedid } = useParams();

    /**Review Link component
     * a user can only write one review per podcast
     * if there is a user's review on the showing podcast
     * then we will not show "Write Your Review" Button
     */
    function ReviewLink(){
        const reviewUsername = reviews.reviews.filter(review=>review.username === currentUser.username);
        if(currentUser && reviewUsername.length!==0){
            return(
                ""
            );
        } else{
            return(
                <Button><Link to='./form'>Write your Review</Link></Button>
            );
        }
    }

    /** EditAndDeleteButton component 
     * shows edit and delete button on a review that currentUser wrote
     * handleClick on delete will setReviews and delete data from database
    */
     function EditAndDeleteButton({review}){
        /** handleClick
         * -request to delete reviews
         * -get updated reviews from backend and assign it to reviews state
          */
       async function handleClick(evt){
            evt.preventDefault();
            try{
                await PodApi.deleteReviews(currentUser.username, review.id);
                let updatedReviews = await PodApi.getReviews(feedid);
            setReviews(updatedReviews)
            }catch(err){
                console.error(err);
            }
        }

        return(
            <div>
                {currentUser.username===review.username
                ? (
                    <Box>
                    <Button><Link to={`./${review.id}/edit`}>Edit</Link></Button>
                    <Button onClick={handleClick}>Delete</Button>
                    </Box> 
                  )
                : ''}
            </div>
        )
    }

    return( 
        <div>          
            {reviews.reviews.length===0
            ? <Typography variant='h5' sx={{p:2}}>There is no review.</Typography>
            : <Typography variant='h5' sx={{p:2}}> Reviews </Typography>}
    
            {currentUser? <ReviewLink /> : <MessageToLogin message={"Write your Review"}/>}
            <List>
             <Grid container sx={{display:'flex', justifyContent:'center'}}>
                <Grid item xs={11} md={8} sx={{justifyContent:'center', alignItems:'center'}}>
                {reviews.reviews.map(review =>{
                    return(
                        <ListItem key={review.id} sx={{display:'flex', flexDirection:'column'}} >              
                            <Card sx={{width:"100%", p:2}}>
                                <Box sx={{display:"flex", justifyContent:'space-between', alignItems:'center', width:'100%', p:1}}>
                                    <Rating value={review.rating} readOnly/>
                                    <Typography variant="body2">{moment(review.createdAt).utc().format("MM/DD/YYYY")}</Typography>
                                </Box>
                                <Box sx={{width:'100%', p:1}}>             
                                    <Typography sx={{display:'flex', flexWrap:'wrap', wordBreak:'break-all'}}>Username: {review.username}</Typography>
                                </Box>
                                <Box sx={{width:'100%', p:1}}>
                                <Typography variant="body2">{review.comment}</Typography>
                                </Box>
                                {currentUser
                                ? <EditAndDeleteButton review={review} />
                                : ''}
                            </Card>                                   
                        </ListItem>
                    )
                })}
                </Grid>
            </Grid>
            </List>         
            <Link to='..'>
                <Button>Back to the Episodes</Button>
            </Link>
        </div>
    )
  }
  
  export default ReviewList;