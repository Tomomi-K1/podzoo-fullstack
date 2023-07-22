import React, { useState, useEffect } from "react";

import removeTags from "../common/helper";
import Loader from "../common/Loader";

import PodApi from "../api/PodApi";

import PodcastList from "../podcasts/PodcastList";
import CategoryList from "../category/CategoryList";
import categories from "../category/categories";
// Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';




function Home() {
    
    const [podcasts, setPodcasts] = useState(null);

    useEffect(function getPodcasts() {
        console.debug("get podcasts in useEffect");
        api();
    }, []);

    async function api(){
        console.log(`api call at Home`)
        try{
            let result =await PodApi.getTrendingPodcasts();
            setPodcasts(result);
        }catch(err){
            console.log(`error when making api call`)
        }
    }
    
    console.log(podcasts)
    if(!podcasts){
        return <Loader />
    }
  
    return (
        <div className="Homepage">
            <form>
                <h1>Search</h1>
            </form>
            <Typography variant="h3" sx={{m:5, fontWeight:'bold'}}> Find by Categories</Typography>
                <CategoryList categories={categories}/>
        
            <Typography variant="h3" sx={{m:5, fontWeight:'bold'}}>Trending podcasts</Typography>
                <PodcastList podcasts={podcasts}/>
        </div>
        
    );
  }
  
  export default Home;

  
// <h2>Episode</h2>
// {podcasts.map(feed =>{
//     return (
//         <div className={feed.id}>
//             <img src={feed.image} alt="podcast artwork" height={100} width={100}/>
//             <h3>{feed.title}</h3>
//             <p>{feed.description}</p>
//             <figure>
//             <figcaption>Listen to episode {feed.episode}</figcaption>
//                 <audio
//                     controls
//                     src={feed.enclosureUrl}>

//                 </audio>
//             </figure>
//         </div>
//     ) 
//  })}
  