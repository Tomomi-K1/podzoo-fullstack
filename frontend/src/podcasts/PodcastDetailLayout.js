import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Outlet} from "react-router-dom";
import PodApi from "../api/PodApi";
import { removeTags} from "../common/helper"
import Loader from "../common/Loader";
import UserContext from '../UserContext';
import {handleImageError} from "../common/helper";
import fallbackImage from "../image/default.jpg"
// Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import MessageToLogin from "../common/MessageToLogin";
import FavoriteButton from "../common/FavoriteButton";

/** PodcastDetailLayout
 * Route: "podcast/:feedid"
 * This page shows:
 * - Podcast detailed Information
 * - Rating
 * - User likes or not : FavoriteButton
 * - Shows Outlet : ReivewList, ReviewForm, EpisodeList
 * */

function PodcastDetailLayout(){
    const {currentUser} = useContext(UserContext)
    const {feedid} = useParams();
    const [podcast, setPodcast] = useState(null);
    const [reviews, setReviews] = useState(null);
    let totalRating = 0;
 
    useEffect(function getPodcastAndEpisodes(){
        console.log(`feedid in useEffect ${feedid}`)
        getEpisodes();
        getReviews();
        // updateTotalRating();
    },[feedid, setReviews] )
    
    // function to get episodes of a podcast
    async function getEpisodes(){
        try{
            const res =await PodApi.getEpisodes(feedid);
            setPodcast(res);
        }catch(err){
            console.log(err);
        }  
    }
    // function to get reviewInfo
    async function getReviews(){
        try{
            const res= await PodApi.getReviews(feedid);
            setReviews(res);
         
        } catch(err){
            console.log(err);
        }
    }
    
    if(reviews){
        totalRating = reviews.avgRating? reviews.avgRating: 0;
    }
   
    if(!podcast){
        return <Loader />
    }
    return(
        <>
        <Box sx={{backgroundColor:"#e0e0e0", flexGrow:1, pt:3, pb:3}}>
            <Grid container spacing={1} sx={{flexGrow:1, justifyContent:"center"}} >
                <Grid item xs={12} md={11} lg={8} sx={{ display:"flex", justifyContent:"center"}}>
                    <Grid container spacing={1} sx={{flexGrow:1, justifyContent:"center"}} > 
                        <Grid item xs={12} md={6} lg={6} sx={{ display:"flex", justifyContent:"center", alignItems:'center'}}>
                            {/* <Grid container justifyContent="center" spacing={1}> */}
                            <img src={podcast.feed.artwork?podcast.feed.artwork:fallbackImage} height='300px' width='300px' alt='podcast artwork' onError={handleImageError}/>   
                        </Grid>
                        <Grid item xs={10} md={6} lg={6} sx={{ display:"flex", flexDirection: 'column', justifyContent:"left"}}>
                            {/* md and above version */}
                            <Typography variant="h4" color="text.primary" sx={{fontWeight:'bold', mt: '10px', textAlign: "left", display:{ xs:'none', md:'block'}}}>
                                {podcast.feed.title}
                            </Typography>
                            <Typography variant="h6" color="text.primary" sx={{mt: '10px', textAlign: "left", display:{ xs:'none', md:'block'}}}>
                                {podcast.feed.author}
                            </Typography>
                            <Typography variant="body1" color="text.primary" sx={{mt: '10px', textAlign: "left", display:{ xs:'none', md:'block'}}}>
                                {removeTags(podcast.feed.description)}
                            </Typography>

                            {/* xs version */}
                            <Typography variant="h4" color="text.primary" sx={{fontWeight:'bold', mt: '10px', textAlign: "center", display:{ xs:'block', md:'none'}}}>
                                {podcast.feed.title}
                            </Typography>
                            <Typography variant="h6" color="text.primary" sx={{mt: '10px', textAlign: "center", display:{ xs:'block', md:'none'}}}>
                                {podcast.feed.author}
                            </Typography>
                            <Typography variant="body1" color="text.primary" sx={{mt: '10px', textAlign: "center", display:{ xs:'block', md:'none'}}}>
                                {removeTags(podcast.feed.description)}
                            </Typography>
                            <Grid container sx={{display:'flex',flexDirection:'row', mt:2}}>
                                <Grid item xs={12} md={6}>
                                    <Button>
                                        <Link to={`./reviews`}>
                                            <Rating value={totalRating} readOnly/>
                                        </Link>
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                {/*if CurrentUser does not exist, show a button version of MessageToLogin*/}
                                {currentUser
                                ? <FavoriteButton podcastData={podcast.feed} feedId={feedid} />
                                : <MessageToLogin message={"favorite"} />
                                }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        <Box component='section' sx={{backgroundColor:'#fafafa', height:'100vh'}}>
            <Outlet context={{reviews:reviews, count:podcast.episodeData.count, episodes:podcast.episodeData.episodes, link:podcast.feed.link, setReviews}}/>
        
        </Box>
      </>
  )
}

export default PodcastDetailLayout;
    



  

  