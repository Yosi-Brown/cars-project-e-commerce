import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';


function ViewProduct({ product }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpenPicture, setIsOpenPicture] = useState(false);
  const [isImageScaled, setIsImageScaled] = useState(false);
  const { cart, addToCart } = useContext(CartContext);

  console.log(product);

  const handleOpenPicture = () => {
    setIsOpenPicture(true);
    setTimeout(() => setIsImageScaled(true), 10); // To ensure transition works
  };

  const handleClosePicture = () => {
    setIsImageScaled(false);
    setTimeout(() => setIsOpenPicture(false), 500); // Duration should match the transition
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex-1 p-4">
            <div
              className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden relative"
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
            <div className="flex space-x-2 mb-4">
              <button className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 ease-in-out" onClick={() => addToCart(product)}>Add to Cart</button>
              {/* <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 ease-in-out">Add to Wishlist</button> */}
            </div>
          </div>
          <div className="md:flex-1 p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white"> {product.company} {product.model}</h1>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <div><span className="font-bold">Company:</span> {product.company}</div>
              <div><span className="font-bold">Model:</span> {product.model}</div>
              <div><span className="font-bold">Engine Displacement (cc):</span> {product.engine_displacement_cc}</div>
              <div><span className="font-bold">Horsepower:</span> {product.horsepower}</div>
              <div><span className="font-bold">Seats:</span> {product.seats}</div>
              <div><span className="font-bold">Engine Type:</span> {product.engine_type}</div>
              <div><span className="font-bold">Car Type:</span> {product.category.name}</div>
              <div><span className="font-bold">Year:</span> {product.year}</div>
                {/* <div className="mr-4">
                  <span className="font-bold text-lg md:text-xl text-gray-700 dark:text-gray-300">Price:</span>
                  <span className="text-lg md:text-xl text-gray-600 dark:text-gray-300">${product.price}</span>
                </div> */}
              <div className="flex mb-4">


              </div>


              {/* <div>
                <span className="font-bold">Colors:</span>
                <div className="flex justify-center items-center mt-2 space-x-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700"></button>
                </div>
              </div> */}
              <div>
                {/* <span className="font-bold">Image Link:</span>
                <a href="https://example.com" className="text-blue-500 dark:text-blue-400 inline-block mt-2 hover:underline">https://example.com</a> */}
              </div>
              {/* <div>
                <span className="font-bold">Product Description:</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique nihil nam nesciunt, sint at rerum eum molestias blanditiis ut aperiam quidem dicta atque temporibus quasi soluta cum. Doloribus, optio iusto.
                </p>
              </div> */}
              {/* <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Company:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-1">{product.company}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Model:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-1">{product.model}</span>
              </div> */}
            </div>
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
  );
}

export default ViewProduct;
