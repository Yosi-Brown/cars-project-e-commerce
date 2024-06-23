import React, { useContext, useEffect } from 'react';
import InputRegister from './InputRegister';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import PasswordInput from '../logIn/PasswordInput';

const url = import.meta.env.VITE_URL;

function RegisterForm({ user = null, editUser = false, onClose }) {
  const userData = user || {};
  const initialValues = {
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    password: '',
    confirmPassword: '',
    phone: userData.phone || '',
    address: userData.address || '',
  };

  const { setSendGetRequest } = useContext(GlobalContext);
  const { isAuth, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelEditUser = async (values) => {
    try {
      const newValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
      };
      const confirmation = confirm("Are you sure you want Save?");
      if (confirmation) {
        const { data } = await axios.put(`${url}/users/updateUser/${user._id}`, newValues, { withCredentials: true });
        if (data.success) {
          onClose()
          setSendGetRequest((prev) => !prev);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (isAuth && !user) navigate("/dashboard");
  // }, [isAuth, navigate, user]);

  return (
    <Formik
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: !user && !editUser ? Yup.string().required('Required') : Yup.string(),
        phone: Yup.string()
          .matches(/^(\+972|0)?[5-9]\d{8}$/, 'Invalid Israeli phone number')
          .required('Required'),
        address: Yup.string().required('Required'),
      })}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        if (!editUser) {
          signUp(values);
          if (isAuth) {
            actions.resetForm();
          }
        }
        if (editUser) {
          handelEditUser(values);
        }
      }}
    >
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center mx-auto md:h-screen lg:py-0">
        {/* <div className="flex flex-col h-auto items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0"> */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <FormikForm className="space-y-4 md:space-y-6">
                <InputRegister
                  label='First Name'
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                />
                <InputRegister
                  label='Last Name'
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                />
                <InputRegister
                  label='Email'
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                />
                {!user && (
                  <>
                    <PasswordInput
                      label='Password'
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                    />
                    <PasswordInput
                      label='Confirm Password'
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                    />
                  </>
                )}
                <InputRegister
                  label="Phone"
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                />
                <InputRegister
                  label='Address'
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                />
                <div className="flex items-center justify-between">
                  {!editUser ? (
                    <div className='flex gap-4 w-full'>
                      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign Up
                      </button>
                      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => navigate('/login')}>
                        Back to Log In
                      </button>
                    </div>
                  ) : (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit">
                      Save changes
                    </button>
                  )}
                </div>
              </FormikForm>
            </div>
          </div>
        </div>
      </section>
    </Formik>
  );
}

export default RegisterForm;
