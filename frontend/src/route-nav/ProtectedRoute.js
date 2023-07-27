import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);
    if (!currentUser) {
      console.log(`no user`)
      return <Navigate to='/'/>;
    }
    console.log(`this ran?`)
    return children;
  };

export default ProtectedRoute;