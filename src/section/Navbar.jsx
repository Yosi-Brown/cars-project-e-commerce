import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import Cart from "../components/cart/Cart";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import { ImProfile } from "react-icons/im";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { BsHeartFill } from "react-icons/bs";
import { FavoritesContext } from "../contexts/FavoritesContext";

const url = import.meta.env.VITE_URL;

function Navbar() {
  const { categoryId, setCategoryId } = useContext(GlobalContext);
  const { favorites } = useContext(FavoritesContext);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const { isAuth, logOut } = useContext(AuthContext);
  const { setIsOrderPage, cart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  let lenOfFavorites = favorites.length;
  const lenOfCart = cart.length;

  const navigate = useNavigate();
  const menuRef = useRef();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const getCategories = async () => {
    const { data } = await axios.get(`${url}/categories/getall`, {
      withCredentials: true,
    });
    if (data.success) {
      setCategories(data.categories);
    }
  };

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setCategoryId(id);
    navigate(`/category/${id}`);
    setDropdownOpen(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const menuItems = (
    <>
      <li>
        <Link
          to="/allProducts"
          className="block py-2 px-4 text-gray-900 bg-yellow-300 dark:bg-fuchsia-600 dark:text-white rounded-md  dark:hover:bg-fuchsia-700 text-center"
          onClick={() => setCategoryId(null)}
        >
          Products
        </Link>
      </li>
      <li className="relative" ref={menuRef}>
        <button
          id="dropdownNavbarLink"
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full py-2 px-4 text-gray-900 bg-yellow-300 dark:bg-fuchsia-600 dark:text-white rounded-md  dark:hover:bg-fuchsia-700 text-center"
        >
          Categories
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdownNavbar"
          className={`z-10 ${
            dropdownOpen ? "block" : "hidden"
          } absolute top-full mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44  dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="py-2 text-sm  text-gray-700 dark:text-gray-400"
            aria-labelledby="dropdownLargeButton"
          >
            {categories.map((category) => (
              <li key={category._id}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    handleCategoryChange({ target: { value: category._id } });
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </>
  );

  return (
    <>
      <nav className="navbar bg-yellow-300 dark:bg-fuchsia-600 fixed top-0 left-0 right-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className={`${
                menuOpen ? "block" : "hidden"
              } menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52`}
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/homePage" className="btn btn-ghost text-xl">
            CARS4U
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="navbar-end flex gap-1">
          <button className="relative btn btn-sm md:btn-md dark:bg-gray-700 dark:text-white dark:border-gray-500 flex items-center"
          onClick={() => navigate("/favorites")}
          >
            <BsHeartFill />
            {lenOfFavorites > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {lenOfFavorites}
              </span>
            )}
          </button>

          <button
            className="btn btn-sm md:btn-md dark:bg-gray-700 dark:text-white dark:border-gray-500"
            onClick={() => {
              setIsOrderPage(false);
              navigate("/profile");
            }}
          >
            <ImProfile />
          </button>
          <button className="relative btn btn-sm md:btn-md dark:bg-gray-700 dark:text-white dark:border-gray-500 flex items-center"
                      onClick={() => navigate("cart")}

          >
            <BsCart2 />
            {lenOfCart > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {lenOfCart}
              </span>
            )}
          </button>
          <button
            className="btn btn-sm md:btn-md dark:bg-gray-700 dark:text-white dark:border-gray-500"
            onClick={toggleDarkMode}
          >
            {darkMode ? <IoSunny /> : <MdOutlineDarkMode />}
          </button>
          <button
            className="btn btn-sm md:btn-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500"
            onClick={isAuth ? logOut : () => navigate("/login")}
          >
            {isAuth ? "Log out" : "Login"}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
