import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Outlet} from "react-router-dom";
import PodApi from "../api/PodApi";
import removeTags from "../common/helper"
import Loader from "../common/Loader";
import UserContext from '../UserContext';
// component
import EpisodeList from "../episodes/EpisodeList";
// Material UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

/** This page shows:
 * Podcast detailed Information
 * Rating
 * List of Episode 
 * User likes or not
 * */

function PodcastDetailLayout(){
    const {currentUser} = useContext(UserContext)
    const {feedid} = useParams();
    const [podcast, setPodcast] = useState(null);
    const [reviews, setReviews] = useState(null);
    let totalRating = 0;
    // const avgRating = (reviews.avgRating ===null)? 0 :reviews.avgRating;
   

    useEffect(function getPodcastAndEpisodes(){
        console.log(`feedid in useEffect ${feedid}`)
        getEpisodes();
        getReviews();
    },[feedid] )
    
    async function getEpisodes(){
        try{
            const res =await PodApi.getEpisodes(feedid);
            setPodcast(res);
        }catch(err){
            console.log(err);
        }
        
    }

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
   
    // function handleClick(evt){
    //     evt.preventDefault();
    //     if(!currentUser.fav_podcasts.includes(feedid)){
    //         currentUser.fav_podcasts.push(feedid);
    //        // call api to add favorite but also to CurrentUser fav_podcasts
    //     } else {
      
    //     }
    // }

    if(!podcast){
        return <Loader />
    }

    return(
        <>
        <header>
        <Box sx={{backgroundColor:"lightgrey", flexGrow:1, pt:3, pb:3}}>
        <Grid container spacing={1} sx={{flexGrow:1, justifyContent:"center"}} >
            <Grid item xs={12} md={11} lg={8} sx={{ display:"flex", justifyContent:"center"}}>
                <Grid container spacing={1} sx={{flexGrow:1, justifyContent:"center"}} > 
                    <Grid item xs={12} md={6} lg={6} sx={{ display:"flex", justifyContent:"center"}}>
                        {/* <Grid container justifyContent="center" spacing={1}> */}
                        <img src={podcast.feed.artwork} height='300px' width='300px' alt='podcast artwork'/>   
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} sx={{ display:"flex", flexDirection: 'column', justifyContent:"left"}}>
                        {/* md and above version */}
                        <Typography variant="h4" color="text.primary" sx={{mt: '10px', textAlign: "left", display:{ xs:'none', md:'block'}}}>
                            {podcast.feed.title}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{mt: '10px', textAlign: "left", display:{ xs:'none', md:'block'}}}>
                            {podcast.feed.author}
                        </Typography>
                        <Typography variant="body1" color="text.primary" sx={{mt: '10px', textAlign: "left", display:{ xs:'none', md:'block'}}}>
                            {removeTags(podcast.feed.description)}
                        </Typography>

                        {/* xs version */}
                        <Typography variant="h4" color="text.primary" sx={{mt: '10px', textAlign: "center", display:{ xs:'block', md:'none'}}}>
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
                            <Button>
                            <Typography variant='body1' sx={{display:'inline-block', mx:1}}>Favorite</Typography>
                            {((currentUser.fav_podcasts)&&(currentUser.fav_podcasts.includes(+feedid)))? <FavoriteIcon color='error'/>:<FavoriteBorderIcon />}
                            {/* add onclick={handleClick} handleClick will add this to user's favorite */}
                            </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
      </Grid>
      </Box>
      </header>
      <section>
        {/* <EpisodeList count ={podcast.episodeData.count} episodes={podcast.episodeData.episodes}/> */}
        <Outlet context={{reviews:reviews, count:podcast.episodeData.count, episodes:podcast.episodeData.episodes, link:podcast.feed.link}}/>
    
      </section>
      </>
  )
}

export default PodcastDetailLayout;
    



  

  