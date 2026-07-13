import React, { createContext, useState } from 'react';
import {useEffect} from 'react';

export const UserContext = createContext();

export const User = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
});

useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
}, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
