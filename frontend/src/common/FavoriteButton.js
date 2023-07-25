import React, {useState, useContext} from "react";
import UserContext from "../UserContext";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PodApi from "../api/PodApi";

const label = { inputProps: { "aria-label": "like button" } };

// data I need to receive 
// const podData ={
//     feedId:1000,
//     author: 'author1000',
//     title:'title1000',
//     artwork: 'artwork1000.com'
// }

function FavoriteButton({podcastData, feedId}) {
   
    const { currentUser, likePod, favorites, removeLike, checkFavPod } = useContext(UserContext);
    const [checked, setChecked] = useState(()=> checkFavPod(feedId));
   
    const username = currentUser.username;
    const data = {
        feedId: podcastData.id,
        author: podcastData.author,
        title: podcastData.title,
        artwork: podcastData.artwork
    }

    function handleChange (evt){
        console.debug(`handleChange ran in favoriteButton`)
        
        if(evt.target.checked === true){
            console.debug(`add`)
            setChecked(true);
            likePod(username, feedId, data);
        } else{
            console.debug(`remove`)
            setChecked(false);
            removeLike(username, feedId);    
        }
      };
   
  return (
    <form>
        <FormControlLabel 
            control={
                    <Checkbox
                    {...label}
                    checked={checked}
                    color='error'
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={handleChange} />
                    
                    }
            label ="Favorite" />
  </form>
  );
}

export default FavoriteButton;