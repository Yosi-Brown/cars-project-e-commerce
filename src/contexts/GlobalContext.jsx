import { createContext, useEffect, useState } from "react"


const url = import.meta.env.VITE_URL

export const GlobalContext = createContext();

function GlobalProvider({ children }) {

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    // console.log(JSON.parse(savedUser));
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const [currentUser, setCurrentUser] = useState({})
  const [sendGetRequest, setSendGetRequest] = useState(false)
  const [categoryId, setCategoryId] = useState(null)



  const value = {
    currentUser, 
    setCurrentUser: updateCurrentUser,
    setSendGetRequest,
    sendGetRequest,
    categoryId,
    setCategoryId
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;