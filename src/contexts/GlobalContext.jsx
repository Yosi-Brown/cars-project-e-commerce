import { createContext, useEffect, useState } from "react"
import axios from "axios"

const url = import.meta.env.VITE_URL

export const GlobalContext = createContext();

function GlobalProvider({ children }) {

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const [currentUser, setCurrentUser] = useState({})
  const [sendGetRequest, setSendGetRequest] = useState(false)

  const value = {
    currentUser, 
    setCurrentUser: updateCurrentUser,
    setSendGetRequest,
    sendGetRequest
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;