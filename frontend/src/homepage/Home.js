import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import PodApi from "../api/PodApi";
import PodcastList from "../podcasts/PodcastList";
import CategoryList from "../category/CategoryList";
import categories from "../category/categories";
// Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

/** Home
 * Route : '/' main route
 * shows trending podcasts using PodcastList, categories using CategoryLists
 * Have a searchbox that linked to search route
 */

function Home() {
    const [podcasts, setPodcasts] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // runs at first render to get podcasts
    useEffect(function getPodcasts() {
        api();
    }, []);

    // get trending podcasts data and assign it to podcasts state
    async function api(){
        console.log(`api call at Home`)
        try{
            let result =await PodApi.getTrendingPodcasts();
            setPodcasts(result);
        }catch(err){
            console.log(`error when making api call`)
        }
    }
    /** handleSubmit of search box
     * it navigates to search route
     */
    function handleSubmit(evt){
        evt.preventDefault();
        navigate(`/search/${searchTerm}`);
    }

    /** handleChange in search box*/
    function handleChange(evt){
        evt.preventDefault();
        let {value} =evt.target;
        setSearchTerm(value);
        console.log(searchTerm);
    }
    
    // if podcasts is not received yet, then show Loader component
    if(!podcasts){
        return <Loader />
    }

    return (
        <div className="Homepage">
            <form onSubmit={handleSubmit}>
            <Box sx={{display:'flex', width: '100%', justifyContent:'center', alignItems:'center', height:'100px', pt:'20px'}}>
            <TextField sx ={{width: '90%'}}
                placeholder='search'
                value={searchTerm}
                onChange={handleChange}
            />     
            </Box>
            </form>
            <Typography variant="h6" sx={{m:3, fontWeight:'bold'}}> Find by Categories</Typography>
                <CategoryList categories={categories}/>
        
            <Typography variant="h3" sx={{m:5, fontWeight:'bold'}}>Trending podcasts</Typography>
                <PodcastList podcasts={podcasts}/>
        </div>
    );
  }
  
  export default Home;


  