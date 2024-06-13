import React from 'react'


function GlobalModal({ children, isOpen, onClose }) {

  if (!isOpen) return null

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded shadow-lg w-auto max-h-screen max-w-full mx-auto dark:bg-gray-900 ">
        <button
              className="absolute top-0 right-0 mt-4 mr-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
              onClick={() => onClose(false)}>
          ✕
        </button>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default GlobalModal;