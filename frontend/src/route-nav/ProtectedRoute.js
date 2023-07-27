import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

/** Protected Route
 *
 * This component will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to homepage.
 */
const ProtectedRoute = ({children}) => {
    const {currentUser} = useContext(UserContext);
    if (!currentUser) {
      return <Navigate to='/'/>;
    }
    return children;
  };

export default ProtectedRoute;