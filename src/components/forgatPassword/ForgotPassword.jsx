import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
const url = import.meta.env.VITE_URL;


function ForgotPassword() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [sendRecoverEmail, setSendRecoverEmail] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()

    const email = e.target.email.value
    
    try {
      // console.log(email);
      const { data } = await axios.post(`${url}/users/forgotPassword`, { email });
     console.log(data);
      if (data.success) {
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
      setSendRecoverEmail(true)
    }
  }
  if (sendRecoverEmail) return (
    <h1 className="flex justify-center items-center h-screen text-3xl">Check your email box</h1>
  )
  return (
    <>
      {isLoading ? <div className="flex justify-center items-center h-screen">
        <Loading />
      </div> :
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">
                    <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      onClick={() => navigate('/login')}>Go back to login</button>
                  </label>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </section>
      }
    </>
  );
}

export default ForgotPassword