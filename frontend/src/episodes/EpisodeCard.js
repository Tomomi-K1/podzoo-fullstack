import React, { useState, useEffect } from "react";
import removeTags from "../common/helper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";


/**use as a card in a episode list */
function EpisodeCard({episode}){
    return (
        <Card className={`${episode.id}`}>
                <img src={episode.image} alt="podcast artwork" height={100} width={100}/>
                <Typography variant='body2'>{episode.title}</Typography>
                <Typography variant='body2'>{removeTags(episode.description)}</Typography>
                <figure>
                <figcaption>Published: {episode.datePublishedPretty}</figcaption>
                {/* if not audio, how  can I show no audio? */}
                    <audio
                        controls
                        src={episode.enclosureUrl}>

                </audio>
            </figure>
     
        </Card>
    );
}

export default EpisodeCard;