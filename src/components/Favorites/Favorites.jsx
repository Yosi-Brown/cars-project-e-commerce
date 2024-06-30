import React, { useContext } from 'react';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";

function Favorites() {
  const { favorites, removeFavorite, removeAllFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/allProducts");
  };

  if (favorites.length === 0) {
    return (
      <div className="mt-24 max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg border-4 border-blue-500 dark:bg-slate-400 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Favorite Products
        </h2>
        <p className="text-gray-700 dark:text-gray-200">No products have been added to favorites yet.</p>
        <button
          className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="mt-24 max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg border-4 border-blue-500 dark:bg-slate-400">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        Favorite Products
      </h2>
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {favorites.map((item) => (
          <li key={item._id} className="flex py-6 items-center">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.image_link}
                alt={item.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    {item.company} {item.model}
                  </h3>
                  <p className="ml-4">${(item.price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4 ">
              <button
                onClick={() => removeFavorite(item._id)}
                className="flex items-center justify-center rounded-full border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 transition duration-300"
              >
                <MdDeleteForever size={24} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 flex justify-between gap-5">
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 transition duration-300"
          onClick={() => removeAllFavorites()}
        >
          Remove All Favorites
        </button>
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition duration-300"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Favorites;
