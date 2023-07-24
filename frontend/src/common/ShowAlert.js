import React from "react";
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

/** component to effectively show alert messages.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function ShowAlert({ type = "error", messages = [] }) {
  console.debug("Alert", "type=", type, "messages=", messages);

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
