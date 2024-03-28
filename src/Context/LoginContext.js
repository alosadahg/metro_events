import React, { createContext, useState } from "react";

export const UserContext = createContext();

const LoggedUserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loggedState, setLoggedState] = useState({
    userType: "",
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loggedState, setLoggedState }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default LoggedUserProvider;
