import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import Cart from '../components/cart/Cart';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';
import { ImProfile } from "react-icons/im";
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const url = import.meta.env.VITE_URL;

function Navbar() {
  const { categoryId, setCategoryId } = useContext(GlobalContext);
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { isAuth, logOut } = useContext(AuthContext);
  const { setIsOrderPage } = useContext(CartContext);

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const getCategories = async () => {
    const { data } = await axios.get(`${url}/categories/getall`, { withCredentials: true });
    if (data.success) {
      setCategories(data.categories);
    }
  };

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setCategoryId(id);
    navigate(`/category/${id}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const menuItems = (
    <>
      <li className= "dark:bg-fuchsia-600 dark:text-white rounded-md" onClick={() => setCategoryId(null)}>
        <Link to="/allProducts">Products</Link>
      </li>
      <li>
        <select
          onChange={handleCategoryChange}
          className="p-2 bg-yellow-300 dark:bg-fuchsia-600 dark:text-white"
          value=""
        >
          <option value="" disabled hidden>Select Category</option>
          {categories?.map((category) => (
            <option
              key={category._id}
              value={category._id}
              className='bg-yellow-300 dark:bg-fuchsia-600 dark:text-white'
            >
              {category.name}
            </option>
          ))}
        </select>
      </li>
    </>
  );

  return (
    <>
      <nav className="navbar bg-yellow-300 dark:bg-fuchsia-600 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
          <Link to="/homePage" className="btn btn-ghost text-xl">CARS4U</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems}
          </ul>
        </div>
        <div className="navbar-end flex gap-1">
          <button
            className="btn btn-sm md:btn-md dark:bg-gray-700 dark:text-white dark:border-gray-500"
            onClick={() => { setIsOrderPage(false); navigate('/profile'); }}
          >
            <ImProfile />
          </button>
          <button onClick={() => setCartOpen(true)} className="btn btn-sm md:btn-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500">
            <BsCart2 className='dark:text-white' />
          </button>
          <button className="btn btn-sm md:btn-md dark:bg-gray-700 dark:text-white dark:border-gray-500" onClick={toggleDarkMode}>
            {darkMode ? <IoSunny /> : <MdOutlineDarkMode />}
          </button>
          <button className="btn btn-sm md:btn-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500" 
            onClick={isAuth ? logOut : () => navigate('/login')}
          >
            {isAuth ? "Log out" : "Login"}
          </button>
        </div>
        {cartOpen && <Cart setCartOpen={setCartOpen} />}
      </nav>
    </>
  );
}

export default Navbar;
