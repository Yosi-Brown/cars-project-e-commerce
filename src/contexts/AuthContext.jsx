import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toastFire } from "../utils/Toaster";
import { GlobalContext } from "./GlobalContext";
// import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_URL

export const AuthContext = createContext();


function AuthProvider({ children }) {
  // const navigate = useNavigate();

  
  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  const [isAuth, setIsAuth] = useState(false)

  const [isEditing, setIsEditing] = useState(false);


  async function authUser() {
    try {
      const { data } = await axios.get(`${url}/users/auth`, { withCredentials: true })

      if (data.success) {
        setIsAuth(true)
      }
    } catch (error) {
      console.log(error)
      setIsAuth(false)
      // console.log(error.response.data)
    }
  }

  async function login(value) {
    try {
      const { data } = await axios.post(`${url}/users/login`, value, { withCredentials: true })
      if (data.success) {
        setCurrentUser(data.user);
        toastFire(true, data.message)
        setIsAuth(true)
        // navigate("/allProducts")
        // return true
      }
    } catch (error) {
      toastFire(false, error.response.data.error)
      setIsAuth(false)
      console.log(value)
      console.log(error)
    }
  }

  async function signUp(value) {
    try {
      const { data } = await axios.post(`${url}/users/register`, value, { withCredentials: true })
      if (data.success) {
        setCurrentUser(data.user);
        setIsAuth(true) //התחברות אוטומטית אחרי הרשמה במידה ומתקבל טוקן בהרשמה
        toastFire(true, data.message)
      }
    } catch (error) {
      toastFire(false, error.response.data.message)
      console.log(value)
      console.log(error)
    }
  }

  async function logOut() {
    try {
      const { data } = await axios.get(`${url}/users/logout`, { withCredentials: true })
      if (data.success) {
        toastFire(true, data.message)
        // console.log('logingout')
        setIsAuth(false)
        setCurrentUser(null)
      }
    } catch (error) {
      console.log(error)
      toastFire(false, error.response.data.error)
    }
  };

  const updateProfile = async (values) => {
    try {
      const id = currentUser._id
      // console.log(id);
      // console.log(values)
      const confirmation = confirm("Are you sure you want Save?")
      if (confirmation) {
        const { data } = await axios.put(`${url}/users/updateProfile/${id}`, values, { withCredentials: true });
        if (data.success) {
          toastFire(true, data.message)
          console.log('profile updated')
          setCurrentUser(data.user)
          setIsEditing(false)
        }
      }
    } catch (error) {
      console.log(error)
      toastFire(false, error.response.data.error)
    }


  }

  // useEffect(() => {
  //   authUser()
  //   // console.log(isAuth)
  // }, [])

  const value = {
    isAuth,
    setIsAuth,
    login,
    logOut,
    signUp,
    currentUser,
    setCurrentUser,
    updateProfile,
    isEditing,
    setIsEditing
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;