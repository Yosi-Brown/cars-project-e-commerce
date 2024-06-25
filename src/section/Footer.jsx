import React from 'react';

function Footer() {
  return (
    <footer className=" bg-yellow-300 dark:bg-gray-800 mt-8">
    {/* <footer className=" bg-yellow-300 rounded-lg shadow m-4 dark:bg-gray-800"> */}
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://flowbite.com/" className="hover:underline">CARS4U™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline mr-4 md:mr-6">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline mr-4 md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline mr-4 md:mr-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
