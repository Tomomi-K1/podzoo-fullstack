import React from "react";
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

/** ShowAlert 
 * component to effectively show alert messages.
 * Component using this: LoginForm, SignupForm, ProfileForm 
 **/

function ShowAlert({ type = "error", messages = [] }) {

  return (
        <Alert severity={type}>
        {messages.map(error => (
            <Typography key={error}>
              {error}
            </Typography>
        ))}
      </Alert>
  );
}

export default ShowAlert;
