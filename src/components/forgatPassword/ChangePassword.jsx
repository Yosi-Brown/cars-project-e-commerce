import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toastFire } from '../../../utils/Toaster';
import { toastFire } from '../../utils/Toaster';
import { AuthContext } from '../../contexts/AuthContext';

const url = import.meta.env.VITE_URL;

const ChangePassword = ({ profile, onClos }) => {
  const { currentUser } = useContext(AuthContext)
  const query = new URLSearchParams(location.search);
  const token = query?.get('token')
  const id = query?.get('uid')
  // console.log(id);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  
  
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    
    const oldPassword = e.target?.oldPassword?.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) return alert('Passwords is not compare')
      
      
      try {
        if(profile) {
          console.log(currentUser._id)
          const { data } = await axios.post(`${url}/users/changePassword/${currentUser._id}`,
            {oldPassword, password, confirmPassword},
            { withCredentials: true }
      )
      if (data.success) {
        toastFire(true, data.message)
        onClos()
        // navigate('/profile', { replace: true })
      }  
    } else {
      const { data } = await axios.post(`${url}/users/resetPassword`, {
        id,
        token,
        password,
        confirmPassword
      })
      if (data.success) {
        toastFire(true, data.message)
        navigate('/login')
      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
            {profile && <div>
              <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
