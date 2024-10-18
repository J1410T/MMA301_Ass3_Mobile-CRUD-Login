import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const setUserWithRole = (userData) => {
    setUser({
      ...userData,
      isAdmin: userData.isAdmin,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
