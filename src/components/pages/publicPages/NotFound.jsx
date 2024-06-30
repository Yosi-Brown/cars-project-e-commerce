import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(3); // Initial countdown time

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // Clear the timer if the component unmounts before time is up
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // Clear the countdown interval if the component unmounts before time is up
    return () => clearInterval(countdown);
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-red-700 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the home page.{" "}
          </p>
          <p className="text-lg font-light text-gray-500 dark:text-gray-400">
            You will be redirected to the home page in:
          </p>
          <p className="text-3xl font-bold text-red-600">
            {secondsLeft} seconds
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
