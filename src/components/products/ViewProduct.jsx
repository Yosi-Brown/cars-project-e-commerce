import React, { useState } from 'react'


function ViewProduct({product}) {
  const [isHovering, setIsHovering] = useState(false);

  const [isOpenPicture, setIsOpenPicture] = useState(false)

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="max-w-6xl mx-auto ">
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
                    onClick={() => setIsOpenPicture(true)}
                  >
                    View Full Image
                  </button>
                </div>
              )}
            </div>
            <div className="flex space-x-2 mb-4">
              <button className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 ease-in-out">Add to Cart</button>
              <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 ease-in-out">Add to Wishlist</button>
            </div>
          </div>
          <div className="md:flex-1 p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sample Company - {product.model}</h1>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <div><span className="font-bold">Engine Displacement (cc):</span> {product.engine_displacement_cc}</div>
              <div><span className="font-bold">Horsepower:</span> {product.horsepower}</div>
              <div><span className="font-bold">Seats:</span> {product.seats}</div>
              <div><span className="font-bold">Engine Type:</span> {product.engine_type}</div>
              <div><span className="font-bold">Car Type:</span> {product.car_type}</div>
              <div><span className="font-bold">Year:</span> {product.year}</div>
              <div>
                <span className="font-bold">Colors:</span>
                <div className="flex justify-center items-center mt-2 space-x-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700"></button>
                </div>
              </div>
              {/* <div className="text-lg font-bold text-red-500 dark:text-red-400">
                <span className={`${discountPercentage === '0.00' ? '' : 'line-through'} text-gray-600 dark:text-gray-400`}>${product.price}</span>
                {discountPercentage !== '0.00' && (<>
                  <span className="ml-2">${discountedPrice.toLocaleString()}</span>
                  <span className="text-sm text-red-500 dark:text-red-400 ml-2">({discountPercentage}%)</span>

                </>)}
              </div> */}
              <div>
                <span className="font-bold">Image Link:</span>
                <a href="https://example.com" className="text-blue-500 dark:text-blue-400 inline-block mt-2 hover:underline">https://example.com</a>
              </div>
              <div>
                <span className="font-bold">Product Description:</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                </p>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Company:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-1">{product.company}</span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Model:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-1">{product.model}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {isOpenPicture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
             <button
                className="absolute top-0 right-0 mt-4 mr-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
                onClick={() => setIsOpenPicture(false)}
              >
                ✕
              </button>
          {/* <div
            className={`relative transition-transform duration-500 ease-in-out 
              ${isImageScaled ? 'scale-100' : 'scale-75'}
              `}
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
                onClick={handleOpenPicture}
              >
                ✕
              </button>
          >
            <img
              className="max-w-full max-h-full"
              src={product.image_link} // Ensure this points to the correct image link
              alt="Product Image Full Screen"
            /> */}
          {/* </div> */}
        </div>
      )}
            {/* <button
              className="absolute top-0 right-0 mt-4 mr-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
              // onClick={
              //   // () => navigate("/card")
              // }
            >
              ✕
            </button> */}
    </div>
  );
}

export default ViewProduct