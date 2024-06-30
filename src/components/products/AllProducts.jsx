import React, { useContext, useState } from "react";
import ViewProduct from "./ViewProduct";
import { CartContext } from "../../contexts/CartContext";
import { FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { Navigate } from "react-router-dom";

function AllProducts({ products, isLoading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const { updateFavorites, favorites, removeFavorite } =
    useContext(FavoritesContext);

  const handleModal = (isOpen, product = null) => {
    setSingleProduct(product);
    setIsModalOpen(isOpen);
  };

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav._id === productId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[80%] mx-auto justify-center pt-5">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <div onClick={() => handleModal(true, product)}>
            <div className="relative">
              <div className="p-4 rounded-t-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  src={
                    product.image_link ||
                    "https://via.placeholder.com/150?text=Image+Not+Available"
                  }
                  alt={`${product.model} image`}
                />
              </div>
              <button
                className="absolute top-2 left-2 rounded-full p-2.5 focus:ring-4 focus:outline-none transition duration-300"
                style={{
                  backgroundColor: isFavorite(product._id) ? "red" : "transparent",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFavorite(product._id)) {
                    removeFavorite(product._id);
                  } else {
                    updateFavorites(product);
                  }
                }}
              >
                {isFavorite(product._id) ? (
                  <IoHeartDislikeOutline size={20} />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </button>
            </div>
            <div className="px-4 pb-4">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                {product.company} {product.model}
              </h5>
              <p className="text-gray-700 dark:text-gray-400 mb-1">
                Company: <span className="font-medium">{product.company}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-400 mb-1">
                Category:{" "}
                <span className="font-medium">{product.category.name}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-400 mb-1">
                Year: <span className="font-medium">{product.year}</span>
              </p>
              <div className="mt-3 mb-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {"$"}
                  {product.price.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 pb-4">
            <button
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                Navigate("");
              }}
            >
              buy now
            </button>
            <button
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <ViewProduct
          product={singleProduct}
          isOpen={isModalOpen}
          onClose={() => handleModal(false)}
        />
      )}
    </div>
  );
}

export default AllProducts;
