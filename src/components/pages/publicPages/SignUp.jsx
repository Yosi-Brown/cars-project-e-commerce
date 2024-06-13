import React from 'react'
import RegisterForm from '../../registerUser/RegisterForm'

function SignUp() {
  return (
    <div className='flex justify-center items-center h-[100vh] mx-auto w-1/2'>
      <div className='w-1/2 h-[80vh]'>
      <RegisterForm />
      </div>
    </div>
  )
}

export default SignUp