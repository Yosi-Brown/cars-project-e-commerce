import React from "react";

function Pagination({
  productPerPage,
  currentPage,
  setCurrentPage,
  totalProduct,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="fixed bottom-[5vh] left-0 right-0 flex justify-center items-center dark:text-white">
      <ul className="flex gap-5">
        <li>
          <button
            className={`p-2.5 rounded ${currentPage === 1 ? "bg-gray-300 dark:bg-gray-800" : "bg-transparent border border-white"}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${
                currentPage === number
                  ? "bg-blue-500"
                  : "bg-transparent border border-white"
              } p-2.5 rounded`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`p-2.5 rounded ${currentPage === pageNumbers.length ? "bg-gray-300 dark:bg-gray-800" : "bg-transparent border border-white"}`}
            onClick={handleNextPage}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;