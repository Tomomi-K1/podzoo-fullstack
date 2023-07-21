import React, { useState, useEffect } from "react";
import axios from "axios";

/**show a episodes's detailed info in one page after clicking one episode out of episode list */
function EpisodeDetail() {
    return(
      <div>
        <h1>This is Episode Detail</h1>
      </div>
    );
}
  
  export default EpisodeDetail;


  // const [episodes, setEpisodes] = useState(null);

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
  