import React, {useState, useContext} from "react";
import UserContext from "../UserContext";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";


const label = { inputProps: { "aria-label": "like button" }};
/** shows favorite button
 * makes api call to backend to remove and add user's favorite
 * update heart colored when it is clicked
 * component using this : PodcastDetailedLayout.js
 */
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