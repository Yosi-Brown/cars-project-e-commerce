import React, { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ setCartOpen }) => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const closeCart = () => {
    setCartOpen(false);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center items-center z-10">
      <div className="bg-white w-96 h-auto max-h-full shadow-xl p-4 overflow-y-auto dark:bg-gray-400 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
          <button onClick={closeCart} className="btn btn-sm btn-circle btn-outline">
            <BsX />
          </button>
        </div>
        <div className="mt-8">
          <ul role="list" className="-my-6 divide-y divide-gray-200 ">
            {cart.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={item.image_link} alt={item.name} className="h-full w-full object-cover object-center" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.company} {item.model}</h3>
                      <p className="ml-4">${item.price * item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="btn btn-sm btn-outline mr-2"
                      >
                        -
                      </button>
                      <p className="text-gray-900">{item.quantity}</p>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="btn btn-sm btn-outline ml-2"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="btn btn-sm btn-outline text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-200 px-4 py-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${total}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={closeCart}
              >
                Continue Shopping <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
