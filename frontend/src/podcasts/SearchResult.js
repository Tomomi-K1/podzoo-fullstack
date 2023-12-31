import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader";
import PodApi from "../api/PodApi";
import PodcastList from "./PodcastList";
// Material UI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography  from "@mui/material/Typography";

/** SearchResult
 * Route: "search/:term"
 * -shows list of podcasts that matches to the search term using PodcastList component
 * -Filter and sorts list of podcasts
 */
function SearchResult(){
    const navigate = useNavigate();
    const {term} = useParams();
    // podcasts: original data received from backend with searchTerm
    const [originalPods, setOriginalPods] = useState(null);
    // searchTerm for searching podcasts: useEffect
    const [searchTerm, setSearchTerm] = useState('');
    // list of categories received from backend
    const [categories, setCategories] = useState([]);
    // for sort and filter: data is passed in the prop"podcast" to PodcastCard to render the page
    const [podcasts, setPodcasts]= useState(null); 
    // data to save user selected sort item
    const [sortBy, setSortBy] = useState('');
    // data to save user selected filter item
    const [filterByCateg, setFilterByCateg] = useState('');
    
    /**  Use effect will run if 'term' changes
     * - get podcasts from backend that matches to search term
     * - get podcast categories from third party api to use it in the filter
     * - assign podcasts data to 'data' state so that we can keep original podcasts data when we filter data
     * -set sortby, filterByCateg to reset to original state
    */
    useEffect(() => {
        async function getPodcastsByTerm(){
            let res = await PodApi.searchPodcasts(term);
            let categories = await PodApi.getCategories();
            categories.sort((a,b) =>{
                return a.name < b.name? -1: 1;
            })
            setOriginalPods(res.data)
            // set initial data to be same as 'originalPods' variable data
            setPodcasts(res.data)
            setCategories(categories);
            // reset sortBy, setFilterBy
            setSortBy('');
            setFilterByCateg('');
        }
        getPodcastsByTerm();
    }, [term]);

      /**handle submit on search box
       * -reset filter and sort */
    function handleSubmit(evt){
        evt.preventDefault();
        navigate(`/search/${searchTerm}`);
        setFilterByCateg('');
        setSortBy('');
    }

    /**handleChange on search box */
    function handleChange(evt){
        evt.preventDefault();
        let {value} =evt.target;
        setSearchTerm(value);
    }

    /**handle sorting
     * get user's input as 'value'
     * short depending on either 'title' or 'author'
     * setPodcasts to newly sorted data
     */
    function handleSortChange(evt){
        evt.preventDefault()
        const {value} =evt.target
        setSortBy(value);
        const sortedPodcasts =podcasts.sort((a, b) => {
          if(a[value] < b[value]){
              return -1;
          }else if(a[value] > b[value]){
              return 1;
          } else{
            return 0;
          }

        }) 
        setPodcasts(p =>[...sortedPodcasts]);
      };
      
    /**handle filtering
     * -reset filter if value is 0
     * - filter by category id number
     * - setPodcasts to filtered podcasts
     * - every time we filter, reset sort value
     */
      function handleFilterChange(evt){
          evt.preventDefault();
          setFilterByCateg(evt.target.value);
          if(evt.target.value ===0){ 
            setPodcasts(originalPods)
            return;
          };

          const filteredpods = originalPods.filter(p => {
                if(p.categories !==null){
                    return evt.target.value in p.categories
                }
            });
          setPodcasts(filteredpods);
          setSortBy('')
      }    
    
    if(!originalPods) return <Loader />
     
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
            <form>
            <Box sx={{display:'flex', justifyContent:'flex-end', width:'90%'}}>
                <FormControl variant='standard' sx={{width: '200px', marginRight:'10px'}}>
                        <InputLabel id="filter-by-category">Filter By Category</InputLabel>
                        <Select
                            labelId="filter-by-category"
                            id="filter"
                            value={filterByCateg}
                            label="filterByCateg"
                            onChange={handleFilterChange}
                        >
                            <MenuItem key ='default' value={0}>No Filter</MenuItem>
                        {categories.map(c=>
                            <MenuItem key ={c.id} value={c.id}>{c.name}</MenuItem>
                        )}
                        </Select>
                    </FormControl>
                    <FormControl variant='standard' sx={{width: '100px'}}>
                        <InputLabel id="sort-by">Sort By</InputLabel>
                        <Select
                            labelId="sort-by"
                            id="sort"
                            value={sortBy}
                            label="sortBy"
                            onChange={handleSortChange}
                        
                        >
                            <MenuItem value="title"> Title </MenuItem>
                            <MenuItem value="author"> Author </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </form>
            {originalPods.length
            ? <PodcastList podcasts={podcasts} />
            : <Typography variant="h6" sx={{mt:5}}> Sorry, no results were found...</Typography>}
            
        </div>
    )
}

export default SearchResult;