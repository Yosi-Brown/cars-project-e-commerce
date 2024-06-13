import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../contexts/GlobalContext'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const { sendGetRequest } = useContext(GlobalContext)

  async function getRequest() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(url, {withCredentials: true})
      setData(data)

    } catch (error) {
      setIsError(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getRequest();
  }, [sendGetRequest])

  return [data, isLoading, isError]
};

export default useFetch