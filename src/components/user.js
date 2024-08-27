import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const User = ({ children }) => {
  const [user, setUser] = useState(null); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
