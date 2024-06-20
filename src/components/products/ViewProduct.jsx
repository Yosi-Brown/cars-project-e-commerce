import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';

function ViewProduct({ product, isOpen, onClose }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpenPicture, setIsOpenPicture] = useState(false);
  const [isImageScaled, setIsImageScaled] = useState(false);
  const { addToCart } = useContext(CartContext);

  if (!isOpen) return null;

  const handleOpenPicture = () => {
    setIsOpenPicture(true);
    setTimeout(() => setIsImageScaled(true), 10); // To ensure transition works
  };

  const handleClosePicture = () => {
    setIsImageScaled(false);
    setTimeout(() => setIsOpenPicture(false), 500); // Duration should match the transition
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-10/12 max-h-80vh mx-auto overflow-auto p-4 md:p-6">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row -mx-2 md:-mx-4">
          <div className="md:flex-1 px-2 md:px-4">
            <div className="h-56 md:h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden relative"
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
                  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-1 md:px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-2 md:px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.company} {product.model}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p>
            <div className="flex mb-4">
            <div className="mr-4">
  <span className="font-bold text-lg md:text-xl text-gray-700 dark:text-gray-300">Price:</span>
  <span className="text-lg md:text-xl text-gray-600 dark:text-gray-300">${product.price}</span>
</div>

              
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div>
            </div>
            
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. 
              </p>
            </div>
          </div>
        </div>
        {isOpenPicture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ease-in-out">
            <div
              className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-in-out 
                ${isImageScaled ? 'scale-100' : 'scale-75'}`}
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
