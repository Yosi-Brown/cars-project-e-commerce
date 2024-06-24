import React, { useState, useEffect, useContext } from 'react';
import placeholderImage from "../../../../assets/images/pictuar1.jpeg";
import useFetch from '../../../../hooks/useFetch';
import { CartContext } from '../../../../contexts/CartContext';
import ViewProduct from '../../../products/ViewProduct';

const url = import.meta.env.VITE_URL;

function HomePage() {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, isLoading, isError] = useFetch(`${url}/products/getall`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    if (data && data.products) {
      setImages(data.products); // שמירה של כל המוצרים במערך images
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handleModal = (isOpen, product = null) => {
    console.log('handleModal:', isOpen, product);
    setSingleProduct(product);
    setIsModalOpen(isOpen);
  };

  const handleImageClick = (product) => {
    console.log('handleImageClick:', product);
    if (product) {
      handleModal(true, product);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading images</div>;

  return (
    <div className="relative h-[130vh] flex items-center justify-center bg-gray-100">
      <div className="relative w-full h-[60vh] overflow-hidden">
        {images.map((product, index) => (
          <div
            key={product.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={product.image_link || placeholderImage}
              className="w-full h-full object-cover cursor-pointer"
              alt={`Slide ${index + 1}`}
              onClick={() => handleImageClick(product)}
            />
          </div>
        ))}
        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-white bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full" onClick={handlePrevClick}>❮</button>
        <button className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-white bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full" onClick={handleNextClick}>❯</button>
      </div>
      {isModalOpen && singleProduct && (
        <ViewProduct
          product={singleProduct}
          isOpen={isModalOpen}
          onClose={() => handleModal(false)}
        />
      )}
    </div>
  );
}

export default HomePage;
