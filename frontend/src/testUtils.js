import React from "react";
import UserContext from "./UserContext";

const demoUser = {
  username: "testuser",
  email: "test@test.net",
  fav:[1,2,3]
};

const favoritesArray =[1, 2]

const UserProvider =
    ({ children, currentUser = demoUser, checkFavPod=()=>true, favorites= favoritesArray}) => (
    <UserContext.Provider value={{ currentUser, checkFavPod, favorites }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };