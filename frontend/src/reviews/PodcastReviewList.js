import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import PodApi from "../api/PodApi";
import removeTags from "../common/helper"
import Loader from "../common/Loader";
// component
import EpisodeList from "../episodes/EpisodeList";
// Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import UserContext from "../UserContext";
import MessageToLogin from "../common/MessageToLogin";

/** This page shows:
 * Podcast detailed Information
 * Rating
 * List of Episode 
 * User likes or not
 * */

function PodcastReviewList(){
    const {currentUser} = useContext(UserContext);
    const{reviews} =useOutletContext();
    console.debug('podcastReviewList')
    console.log(reviews)


    return(
        <List>
            {reviews.reviews.length===0
            ? <Typography variant='h5' sx={{p:2}}>There is no review.</Typography>
            : <Typography variant='h5' sx={{p:2}}> Reviews </Typography>}
            
            {/* if currentUser is null, when user click write a review button, dialog shows up
            to direct user to either/login or signin 
             ex. */}
            {currentUser
              ?  <Button><Link to='./form'>Write your Review</Link></Button>
              :  <MessageToLogin message={"Write your Review"}/>
              }
            
            {reviews.reviews.map(review =>{
                return(
                    <Box key={review.id}>
                        <Typography>{review.username}</Typography>
                        <Rating value={review.rating} readOnly/>
                        <Typography variant="body2">{review.comment}</Typography>
                        {currentUser.username===review.username? <Button><Link to='./form'>Edit</Link></Button> : ''}   
                    </Box>
                )
            })}
            <ListItem>

            </ListItem>
            
            <Link to='..'>
                <Button>Back to the Episodes</Button>
            </Link>
        </List>
    )
  }
  
  export default PodcastReviewList;