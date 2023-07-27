import * as React from "react";
// Material UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

/** MessageToLogin : Button
 * shows button that has pop up message to tell user 
   that you need to login to use favorite or write reivews.
   This component is used when there is no logged in user
 * it accepts message prop 
 * message prop is used as a word on Button
 * component using MessageToLogin : PodcastDetailedLayout.js
 */
function MessageToLogin({message}) {
  return (
    <PopupState variant="popper" popupId="request-login-popper">
      {(popupState) => (
        <div>
          {/* if message is 'favorite', we are adding FavoriteIcon otherwise we will just show the message prop on the button*/}
          {message==='favorite'
            ? (
                <Button variant="default" {...bindToggle(popupState)}>
                  <Typography variant='body1' sx={{display:'inline-block', mx:1}}>Favorite</Typography>
                  <FavoriteBorderIcon />   
                </Button>
              )
            :( 
                <Button variant="default" {...bindToggle(popupState)}>
                  {message}
                </Button>
              )
          }
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>
                    You need to login/signup before accessing this feature.
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}

export default MessageToLogin;