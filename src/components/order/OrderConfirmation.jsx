import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

const OrderConfirmation = () => {
  const { cart, increaseQuantity, decreaseQuantity, isOrderPage, setIsOrderPage } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [localCart, setLocalCart] = useState(cart);

  const total = localCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleProceedToShipping = () => {
    setIsOrderPage(true);
    navigate("/profile");
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
    updateLocalCart(productId, 1);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
    updateLocalCart(productId, -1);
  };

  const updateLocalCart = (productId, change) => {
    setLocalCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + change } : item
      )
    );
  };

  const handleBackToHome = () => {
    navigate("/allProducts");
  };

  return (
    <div className="mt-24 max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg border-4 border-blue-500 dark:bg-slate-400">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        Order Confirmation
      </h2>
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {localCart.map((item) => (
          <li key={item._id} className="flex py-6 items-center">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.image_link}
                alt={item.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    {item.company} {item.model}
                  </h3>
                  <p className="ml-4">${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="btn btn-sm btn-outline mr-2"
                >
                  -
                </button>
                <p className="text-gray-900 mx-2">{item.quantity}</p>
                <button
                  onClick={() => handleIncreaseQuantity(item._id)}
                  className="btn btn-sm btn-outline ml-2"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 mt-6 pt-4">
        <div className="flex justify-between text-xl font-semibold text-gray-900">
          <p>Total :</p>
          <p>${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-5">
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          onClick={handleProceedToShipping}
        >
          Confirm and Proceed to Shipping
        </button>
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
