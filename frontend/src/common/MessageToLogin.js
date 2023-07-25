import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function MessageToLogin({message}) {
  return (
    <PopupState variant="popper" popupId="request-login-popper">
      {(popupState) => (
        <div>
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