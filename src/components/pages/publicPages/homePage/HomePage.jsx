// import { useState, useEffect, useContext } from "react";
// import placeholderImage from "../../../../assets/images/pictuar1.jpeg";
// import ViewProduct from "../../../products/ViewProduct";
// import useFetch from "../../../../hooks/useFetch";

// const url = import.meta.env.VITE_URL;

// function HomePage() {
//   const [data, isLoading, isError] = useFetch(`${url}/products/getall`);
//   const [images, setImages] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [singleProduct, setSingleProduct] = useState(null);

//   const handleModal = (isOpen, product = null) => {
//     setSingleProduct(product);
//     setIsModalOpen(isOpen);
//   };

//   useEffect(() => {
//     if (data && data.products) {
//       setImages([data.products[1], data.products[2], data.products[4]]); // שמירה של כל המוצרים במערך images
//     }
//   }, [data]);

//   console.log(images);

//   return (
//     <div className="carousel w-full">
//       {images.map((product, index) => (
//         <div
//           id={`slide${index + 1}`}
//           className="carousel-item relative w-full"
//           key={index}
//         >
//           <button className="w-full" onClick={() => handleModal(true, product)}>
//             <img
//               src={product.image_link}
//               className="w-full"
//               alt={`Slide ${index + 1}`}
//             />
//           </button>
//           <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//             <a
//               href={`#slide${index === 0 ? images.length : index}`}
//               className="btn btn-circle"
//             >
//               ❮
//             </a>
//             <a
//               href={`#slide${index === images.length - 1 ? 1 : index + 2}`}
//               className="btn btn-circle"
//             >
//               ❯
//             </a>
//           </div>
//         </div>
//       ))}
//       {isModalOpen && (
//         <ViewProduct
//           product={singleProduct}
//           isOpen={isModalOpen}
//           onClose={() => handleModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default HomePage;

// ##################################

// import React from "react";
// import image1 from "../../../../assets/images/pictuar1.jpeg";

// function HomePage() {
//   return (
//     <div
//       className="flex flex-col items-center justify-center"
//       style={{ height: "130vh" }}
//     >
//       <div 
//         className="relative flex items-center justify-center w-full  bg-cover bg-center" 
//         style={{ height: '40%', backgroundImage: `url(${image1})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div> {/* שכבת השקיפות */}
//         <div className="relative text-white">HomePage</div>
//       </div>
//       <div
//         className="flex items-center justify-center bg-gray-100"
//         style={{ height: "40%" }}
//       >
//         middel
//       </div>
//     </div>
//   );
// }

// export default HomePage

import { useState, useEffect } from "react";
import placeholderImage from "../../../../assets/images/pictuar1.jpeg";
import ViewProduct from "../../../products/ViewProduct";
import useFetch from "../../../../hooks/useFetch";

const url = import.meta.env.VITE_URL;

function HomePage() {
  const [data, isLoading, isError] = useFetch(`${url}/products/getall`);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleModal = (isOpen, product = null) => {
    setSingleProduct(product);
    setIsModalOpen(isOpen);
  };

  useEffect(() => {
    if (data && data.products) {
      setImages([data.products[22], data.products[23], data.products[15], data.products[13] , data.products[33]]);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col items-center dark:bg-gray-600  justify-center min-h-screen">
      {/* Header */}
      <header className="w-full bg-gray-800 p-4 text-white flex justify-between items-center">
        <div className="text-lg font-bold">CARS4U</div>
        <nav className="space-x-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center w-full bg-cover bg-center"
        style={{ height: '40vh', backgroundImage: `url(${placeholderImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-white text-4xl font-bold">Welcome to CARS4U</div>
      </section>

      {/* Products Section */}
      <section className="flex items-center  justify-center bg-gray-100 py-10 w-full dark:bg-gray-600 ">
        {isLoading ? (
          <div className="text-center text-2xl">Loading...</div>
        ) : isError ? (
          <div className="text-center text-2xl text-red-600">Error loading products</div>
        ) : (
          <div className="carousel w-full max-w-4xl mx-auto">
            {images.map((product, index) => (
              <div
                key={index}
                className={`carousel-item relative w-full h-56 md:h-[440px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden  ${index === currentSlide ? 'block' : 'hidden'}`}
              >
                <button className="w-full" onClick={() => handleModal(true, product)}>
                  <img src={product.image_link} className="w-full rounded-xl h-25" alt={`Slide ${index + 1}`} />
                </button>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${index === 0 ? images.length : index}`}
                    className="btn btn-circle"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1))}
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${index === images.length - 1 ? 1 : index + 2}`}
                    className="btn btn-circle"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)}
                  >
                    ❯
                  </a>
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
        )}
      </section>

      {/* Footer */}
      {/* <footer className="w-full bg-gray-800 p-4 text-white text-center">
        <p>&copy; 2024 CARS4U. All rights reserved.</p>
        <nav className="space-x-4">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
        </nav>
      </footer> */}
    </div>
  );
}

export default HomePage;

