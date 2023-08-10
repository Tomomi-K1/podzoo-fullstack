import React, {useState, useContext} from "react";
import UserContext from "../UserContext";
// Material UI
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
const label = { inputProps: { "aria-label": "like button" }};

/** FavoriteButton
 * shows favorite button
 * makes api call to backend to remove and add user's favorite
 * update heart colored when it is clicked
 * component using FavoriteButton : PodcastDetailedLayout.js
 */
function FavoriteButton({podcastData, feedId}) {  
    const { currentUser, likePod, removeLike, checkFavPod } = useContext(UserContext);
    const [checked, setChecked] = useState(()=> checkFavPod(feedId));
    const username = currentUser.username;
    // make podcastData suitable for backend database
    const data = {
        feedId: podcastData.id,
        author: podcastData.author,
        title: podcastData.title,
        artwork: podcastData.artwork
    }

     /** == handleChange function  ==
      * Update checkbox information field
      * runs removeLike, LikePod functions
     */
    function handleChange (evt){        
        if(evt.target.checked === true){
            setChecked(true);
            likePod(username, feedId, data);
        } else{
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