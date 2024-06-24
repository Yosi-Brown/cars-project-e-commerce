import React, { useState, useEffect } from 'react';
import placeholderImage from "../../../../assets/images/pictuar1.jpeg"; // ייבוא התמונה המקומית
import useFetch from '../../../../hooks/useFetch';
const url = import.meta.env.VITE_URL;

function HomePage() {
  const [images, setImages] = useState([placeholderImage]); // הגדרת state ראשוני עם התמונה המקומית
  const { data, isLoading, isError } = useFetch(`${url}/products/getall`);
  console.log(data);

  useEffect(() => {
    console.log("Fetched data:", data);
    if (data && data.products) {
      const productImages = [
        data.products[0]?.image_link,
        data.products[4]?.image_link,
        data.products[7]?.image_link,
        data.products[9]?.image_link,
        data.products[16]?.image_link,
      ].filter(Boolean); // מסנן ערכים שלא הוגדרו
      setImages(productImages.length ? productImages : [placeholderImage]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading images</div>;

  return (
    <div className="carousel w-full">
      {images.map((image, index) => (
        <div id={`slide${index + 1}`} className="carousel-item relative w-full" key={index}>
          <img src={image} className="w-full" alt={`Slide ${index + 1}`} />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href={`#slide${(index - 1 + images.length) % images.length + 1}`} className="btn btn-circle">❮</a>
            <a href={`#slide${(index + 1) % images.length + 1}`} className="btn btn-circle">❯</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
