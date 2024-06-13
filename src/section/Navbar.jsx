import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
// import { AuthContext } from '../../contexts/AuthContext';
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";

function Navbar() {
  // const { logOut } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
};

  const menuItems = (
    <>
      <li><Link to="/allProducts">Products</Link></li>
      {/* <li><Link to="/orders">Orders</Link></li>
      <li><Link to="/users">Users</Link></li> */}

<li>
        <details>
          <summary>Categories</summary>
          <ul className="p-2 z-10">
            <li><Link to="/submenu1">cars</Link></li>
            <li><Link to="/submenu2">motorcycles</Link></li>
            <li><Link to="/submenu2">trucks</Link></li>
          </ul>
        </details>
        {/* <details>
          <summary>Categories</summary>
          <ul className="p-2 z-10">
            <li><Link to="/categories/cars">cars</Link></li>
            <li><Link to="/categories/motorcycles">motorcycles</Link></li>
            <li><Link to="/categories/trucks">trucks</Link></li>
          </ul>
        </details> */}
      </li> 
       <li><Link to="/add-product">add product</Link></li>
    </>
  );

  return (
    // <div className={`navbar bg-base-100  ${darkMode ? 'dark' : ''}`}>
    <nav className="navbar  bg-yellow-300 dark:bg-fuchsia-600 ">
    {/* // <div className="dark: "> */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">CARS4U</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500" >Log out</button>
        <button className="btn dark:bg-gray-700 dark:text-white dark:border-gray-500" onClick={toggleDarkMode}>{darkMode ? <IoSunny /> : <MdOutlineDarkMode />

}</button>
        
      </div>
    </nav>
  );
}

export default Navbar;