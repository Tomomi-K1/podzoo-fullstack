import React, { useState, useEffect } from "react";
import axios from "axios";


function Episode(feedId) {
    
//   const [episodes, setEpisodes] = useState(null);

//   useEffect(function getEpisodes() {
//     console.debug("getEpisodes in useEffect");
//     api();
//   }, []);

    // async function api(){
    //     console.log(`api call`)
    //     let result =await axios.get(`http://localhost:3001/podcasts/${feedId}/episode`);
    //     setEpisodes(result.data);
    // }
    
    // console.log(podcasts)
    // if(!podcasts){
    //     return <h1>loading...</h1>
    // }
  
//     return (
//         <div className="Episodes">
//         {podcasts.map(feed =>{
//             return (
//                 <div className={feed.id}>
//                     <img src={feed.artwork} alt="podcast artwork" height={100} width={100}/>
//                     <h3>{feed.title}</h3>
//                     <p>{feed.description}</p>
//                     <figure>
//                     <figcaption>Listen to episode {feed.episode}</figcaption>
//                         <audio
//                             controls
//                             src={feed.enclosureUrl}>

//                         </audio>
//                     </figure>
//                 </div>
//             ) 
//         })}
    
//         </div>
//     );
  }
  
  export default Episode;

  
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
  