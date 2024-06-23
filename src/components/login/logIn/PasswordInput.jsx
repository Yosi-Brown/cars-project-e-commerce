import { Field, useField } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordInput({ ...props }) {
  const [meta, field] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label htmlFor={props.htmlFor}
        className="block text-sm font-medium text-gray-700 dark:text-white">
        {props.label}
      </label>
      <Field type={showPassword ? "text" : "password"}
        name={props.name}
        id={props.id}
        {...field}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={props.placeholder}
      />
      <button type="button" onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 top-2 flex items-center text-sm leading-5">
        {showPassword ? <FaEyeSlash /> : <FaEye />}
        {/* {showPassword ? 'Hide' : 'Show'} */}
      </button>
    </div>
  );
}

export default PasswordInput;