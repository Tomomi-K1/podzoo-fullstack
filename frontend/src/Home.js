import React, { useState, useEffect } from "react";
import axios from "axios";


function Home() {
    
  const [podcasts, setPodcasts] = useState(null);

  useEffect(function getPodcasts() {
    console.debug("get podcasts in useEffect");
    api();
  }, []);

    async function api(){
        console.log(`api call`)
        let result =await axios.get("http://localhost:3001/");
        setPodcasts(result.data.items);
    }
    
    console.log(podcasts)
    if(!podcasts){
        return <h1>loading...</h1>
    }
  
    return (
        <div className="Homepage">
        <h1> Pearch! </h1>    
         <h2>Episode</h2>
{podcasts.map(feed =>{
    return (
        <div className={feed.id}>
            <img src={feed.image} alt="podcast artwork" height={100} width={100}/>
            <h3>{feed.title}</h3>
            <p>{feed.description}</p>
            <figure>
            <figcaption>Listen to episode {feed.episode}</figcaption>
                <audio
                    controls
                    src={feed.enclosureUrl}>

                </audio>
            </figure>
        </div>
    ) 
 })}
    
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
  