import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PodcastCard from "./PodcastCard";
import Loader from "../common/Loader";
// Material UI
import Grid from '@mui/material/Grid';
import PodApi from "../api/PodApi";
import PodcastList from "./PodcastList";



function SearchResult(){
    const [podcasts, setPodcasts] = useState(null);
    const {term} = useParams();
    useEffect(() => {
        async function getPodcastsByTerm(){
            let res = await PodApi.searchPodcasts(term);
            setPodcasts(res.data)
        }
        getPodcastsByTerm();
    })

    if(!podcasts) return <Loader />

    return(
        <PodcastList podcasts={podcasts} />
    )
}

export default SearchResult;