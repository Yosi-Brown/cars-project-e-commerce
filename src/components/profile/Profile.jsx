
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loading from '../loading/Loading';
import ChangePassword from "../forgatPassword/ChangePassword";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_URL;

function Profile() {
  const { currentUser, setCurrentUser, updateProfile, isEditing, setIsEditing } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { isOrderPage, setIsOrderPage, cart } = useContext(CartContext);
  const navigate = useNavigate();

  const initialValues = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
  };

  const validationSchema = Yup.object().shape({
    firstName: isOrderPage ? Yup.string().required('Required') : Yup.string(),
    lastName: isOrderPage ? Yup.string().required('Required') : Yup.string(),
    email: isOrderPage ? Yup.string().email('Invalid email address').required('Required') : Yup.string(),
    phone: isOrderPage ? Yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('Required') : Yup.string(),
    address: isOrderPage ? Yup.string().required('Required') : Yup.string(),
  });


  if (isOrderPage) {
    setIsEditing(true);
  }

  const handleOpenEdit = (bool) => {
    setIsEditing(bool);
  };

  const changePassword = (bool) => {
    setShowChangePassword(bool);
  }

  const handleSubmit = async (values) => {
    const isFormComplete = Object.values(values).every(field => field.trim() !== '');
    if (isOrderPage && !isFormComplete) {
      return;
    }

    const isSuccess = await updateProfile(values);
    if (isSuccess) {
      if ( isOrderPage){
        navigate("/payment")
              }
      setIsEditing(false);
      setIsOrderPage(false);
    }
  }


  const handleCancelClick = (resetForm) => {
    resetForm();
    setIsEditing(false);
  };

  if (showChangePassword) return (<ChangePassword profile={true} onClos={() => setShowChangePassword(false)} />);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center dark:bg-gray-700 ">
      <div className="container max-w-screen-lg mx-auto ">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 dark:text-white">User Profile</h2>
          <p className="text-gray-500 mb-6 dark:text-white">Your personal details</p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 dark:bg-gray-500 ">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ resetForm, values }) => (
                <Form>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 dark:bg-gray-500">
                    <div className="text-gray-600">
                      <p className="font-medium text-lg dark:text-white">Personal Details</p>
                      <p className="dark:text-white">Please ensure your details are correct.</p>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-1">
                          <label htmlFor="firstName">First Name</label>
                          <Field
                            type="text"
                            name="firstName"
                            id="firstName"
                            className={`h-10 border mt-1 rounded px-4 w-full dark:text-white dark:bg-gray-400 ${isEditing ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                          />
                          <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="md:col-span-1">
                          <label htmlFor="lastName">Last Name</label>
                          <Field
                            type="text"
                            name="lastName"
                            id="lastName"
                            className={`h-10 border mt-1 rounded px-4 w-full dark:text-white dark:bg-gray-400 ${isEditing ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                          />
                          <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="email">Email Address</label>
                          <Field
                            type="text"
                            name="email"
                            id="email"
                            className={`h-10 border mt-1 rounded px-4 w-full dark:text-white dark:bg-gray-400 ${isEditing ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50'}`}
                            readOnly={true}
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="md:col-span-1">
                          <label htmlFor="phone">Phone</label>
                          <Field
                            type="text"
                            name="phone"
                            id="phone"
                            className={`h-10 border mt-1 rounded px-4 w-full dark:text-white dark:bg-gray-400 ${isEditing ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="address">Address</label>
                          <Field
                            type="text"
                            name="address"
                            id="address"
                            className={`h-10 border mt-1 rounded px-4 w-full dark:text-white dark:bg-gray-400 ${isEditing ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50'}`}
                            readOnly={!isEditing}
                          />
                          <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        {!isOrderPage &&
                          <div className="md:col-span-2">
                            <br />
                            <button
                              type="button"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 h-10 border mt-1 rounded px-4 w-full"
                              onClick={() => changePassword(true)}
                            >
                              Change Password
                            </button>
                          </div>
                        }

                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            {isEditing ? (
                              <>
                                <button
                                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                  type="submit" onClick={() => handleSubmit(values)}
                                >
                                  {isOrderPage ? "Save and Continue" : "Save"}
                                </button>
                                <button
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  type="button"
                                  onClick={() => handleCancelClick(resetForm)}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => handleOpenEdit(true)}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
