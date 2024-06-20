import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../loading/Loading';
import Pagination from '../../common/Pagination';
import AllProducts from '../../products/AllProducts';
import { useParams } from 'react-router-dom';


const url = import.meta.env.VITE_URL;

function Products() {
  const { categoryId } = useParams()
  // console.log('products',categoryId);
  const category = categoryId
  const urlSpecific = category ? `${url}/categories/getByCategory/${category}` : `${url}/products/getall`
  const [data, isLoading, isError] = useFetch(urlSpecific);
  console.log(urlSpecific);
  // const [data, isLoading, isError] = useFetch(`${url}/products/getall`);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  // console.log(data)

  // useEffect(()=>{

  // },[categoryId])


  let filteredData = data?.products.filter((product) =>
    product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.colors.join(", ").toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.car_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.year.toString().includes(searchTerm) ||
    product.price.toString().includes(searchTerm)
  );

  if (sortBy === "company") {
    filteredData.sort((a, b) => a.company.localeCompare(b.company));
  } else if (sortBy === "price") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (sortBy === "default") {
    filteredData = filteredData
  }

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredData?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>

      {data && (
        <>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded dark:text-gray-300 dark:bg-gray-700"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded dark:text-gray-300 dark:bg-gray-700"
          >
            <option value="" className="dark:text-gray-300">Sort By</option>
            <option value="default" className="dark:text-gray-500">default</option>
            <option value="company" className="dark:text-gray-500">Company</option>
            <option value="price" className="dark:text-gray-500">Price</option>
          </select>
          {isLoading && <Loading />}
          {isError && <div>{isError}</div>}
          <AllProducts products={currentProducts} isLoading={isLoading} />
          <Pagination
            productPerPage={productPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProduct={filteredData?.length}
          />
        </>
      )}
    </>
  );
}

export default Products;