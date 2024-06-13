import React, { useState } from 'react'
import GlobalModal from '../modals/GlobalModal';
import ViewProduct from './ViewProduct';



function AllProducts({ products, isLoading }) {
  // console.log(isLoading);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [singleProduct, setSingleProduct] = useState(null)

  const handleModal = (boll, product = null) => {
    setSingleProduct(product)
    setIsModalOpen(boll)
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[80%] mx-auto justify-center pt-5">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="p-4 rounded-t-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover rounded-lg"
              src={product.image_link || 'https://via.placeholder.com/150?text=Image+Not+Available'}
              alt={`${product.model} image`}
            // onError={(e) => {
            //   console.error(`Error loading image for product ${product._id}: ${product.image_link}`);
            //   e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Available'; // Fallback image on error
            // }}
            />
          </div>
          <div className="px-4 pb-4">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
              {product.model}
            </h5>
            <p className="text-gray-700 dark:text-gray-400 mb-1">Company: <span className="font-medium">{product.company}</span></p>
            <p className="text-gray-700 dark:text-gray-400 mb-1">Car Type: <span className="font-medium">{product.car_type}</span></p>
            <p className="text-gray-700 dark:text-gray-400 mb-1">Year: <span className="font-medium">{product.year}</span></p>
            <div className="mt-3 mb-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            </div>
            <div className="flex items-center mt-2.5 mb-5">

            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition duration-300">
                  Add to cart
                </button>

                <button
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition duration-300"
                  onClick={() => {
                    handleModal(true,product)
                    // setIsModalOpen(true)
                    // setSingleProduct(product)
                  }}
                  >
                  View Product
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && (<GlobalModal isOpen={isModalOpen} onClose={() => handleModal(false)}>
                <ViewProduct product={singleProduct} />
        </GlobalModal>)}
    </div>
  );
}

export default AllProducts