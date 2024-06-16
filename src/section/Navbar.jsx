import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import Cart from '../components/cart/Cart';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const menuItems = (
    <>
      <li><Link to="/allProducts">Products</Link></li>
      <li>
        <details>
          <summary>Categories</summary>
          <ul className="p-2 z-10 dark:bg-gray-600">
            <li><Link to="/submenu1">cars</Link></li>
            <li><Link to="/submenu2">motorcycles</Link></li>
            <li><Link to="/submenu2">trucks</Link></li>
          </ul>
        </details>
      </li>
      <li><Link to="/add-product">add product</Link></li>
    </>
  );

  return (
    <nav className="navbar bg-yellow-300 dark:bg-fuchsia-600 sticky top-0 z-50">
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
        <button className="btn dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500">Log out</button>
        <button onClick={() => setCartOpen(true)} className="btn dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500">
          <BsCart2 />
        </button>
        <button className="btn dark:bg-gray-700 dark:text-white dark:border-gray-500" onClick={toggleDarkMode}>
          {darkMode ? <IoSunny /> : <MdOutlineDarkMode />}
        </button>
      </div>
      {cartOpen && <Cart setCartOpen={setCartOpen} />}
    </nav>
  );
}

export default Navbar;
