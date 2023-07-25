import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PodcastCard from "./PodcastCard";
import Loader from "../common/Loader";
import PodApi from "../api/PodApi";
import PodcastList from "./PodcastList";
// Material UI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";



function SearchResult(){
    const [podcasts, setPodcasts] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const {term} = useParams();
    useEffect(() => {
        async function getPodcastsByTerm(){
            let res = await PodApi.searchPodcasts(term);
            setPodcasts(res.data)
        }
        getPodcastsByTerm();
    }, [term]);

    function handleSubmit(evt){
        evt.preventDefault();
        navigate(`/search/${searchTerm}`);
    }

    function handleChange(evt){
        evt.preventDefault();
        let {value} =evt.target;
        setSearchTerm(value);
        console.log(searchTerm);
    }

    if(!podcasts) return <Loader />

    return(
        <div className="SearchResult">
            <form onSubmit={handleSubmit}>
            <Box sx={{display:'flex', width: '100%', justifyContent:'center', alignItems:'center', height:'100px', pt:'20px'}}>
                <TextField sx ={{width: '90%'}}
                    placeholder='search'
                    value={searchTerm}
                    onChange={handleChange}
                >   
                </TextField>
            </Box>
            </form>
            {podcasts.length
            ? <PodcastList podcasts={podcasts} />
            : <Typography variant="body2"> Sorry, no results were found...</Typography>}
            
        </div>
    )
}

export default SearchResult;