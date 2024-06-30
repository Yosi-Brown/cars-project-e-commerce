import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";

function ViewProduct({ product, isOpen, onClose }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpenPicture, setIsOpenPicture] = useState(false);
  const [isImageScaled, setIsImageScaled] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { updateFavorites, removeFavorite, favorites  } = useContext(FavoritesContext);
  

  if (!isOpen) return null;

  const isFavorite = (productId) => {
    return favorites.some(fav => fav._id === productId  );
  };

  const handleOpenPicture = () => {
    setIsOpenPicture(true);
    setTimeout(() => setIsImageScaled(true), 10); // To ensure transition works
  };

  const handleClosePicture = () => {
    setIsImageScaled(false);
    setTimeout(() => setIsOpenPicture(false), 500); // Duration should match the transition
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-auto">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-10/12 max-h-full md:max-h-80vh mx-auto p-4 md:p-6 overflow-auto">
        <button
          className="absolute top-4 right-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out z-50"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row -mx-2 md:-mx-4 max-h-full overflow-auto">
          <div className="md:flex-1 px-2 md:px-4">
            <div
              className="h-56 md:h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                className="w-full h-full object-cover"
                src={product.image_link}
                alt="Product Image"
              />
              {isHovering && (
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                  <button
                    className="text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
                    onClick={handleOpenPicture}
                  >
                    View Full Image
                  </button>
                </div>
              )}
            </div>
            <div className="flex -mx-1 md:-mx-2 mb-4">
              <div className="w-1/2 px-1 md:px-2">
                <button
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-1 md:px-2">
                {isFavorite(product._id) ? (
                  <button className="w-full text-white dark:text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 py-2 px-4 rounded-full font-semibold"
                    onClick={() => removeFavorite(product._id)}>
                    Remove from Wishlist
                  </button>
                ) : (
                  <button className="w-full text-white dark:text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 py-2 px-4 rounded-full font-semibold"
                    onClick={() => updateFavorites(product)}>
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="md:flex-1 p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.company} {product.model}
            </h1>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <div>
                <span className="font-bold">Company:</span> {product.company}
              </div>
              <div>
                <span className="font-bold">Model:</span> {product.model}
              </div>
              <div>
                <span className="font-bold">Engine Displacement (cc):</span>{" "}
                {product.engine_displacement_cc}
              </div>
              <div>
                <span className="font-bold">Horsepower:</span> {product.horsepower}
              </div>
              <div>
                <span className="font-bold">Seats:</span> {product.seats}
              </div>
              <div>
                <span className="font-bold">Engine Type:</span> {product.engine_type}
              </div>
              <div>
                <span className="font-bold">Car Type:</span> {product.category.name}
              </div>
              <div>
                <span className="font-bold">Year:</span> {product.year}
              </div>
            </div>
          </div>
        </div>
        {isOpenPicture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ease-in-out">
            <div
              className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-in-out 
                ${isImageScaled ? "scale-100" : "scale-75"}`}
            >
              <img
                className="w-full h-full object-contain"
                src={product.image_link}
                alt="Product Image Full Screen"
              />
              <button
                className="absolute top-4 right-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
                onClick={handleClosePicture}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewProduct;
