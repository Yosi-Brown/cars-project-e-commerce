import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { toastFire } from '../../utils/Toaster';
import { useNavigate } from 'react-router-dom';

const url = import.meta.env.VITE_URL

function Payment() {
  const { currentUser } = useContext(GlobalContext);  
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const order = {
    user: currentUser._id,
    products: cart.map(product => ({
      product: product._id,
      quantity: product.quantity
    }))
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2)
        }
      }]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      createOrderDb();
      clearCart();
      navigate("/allProducts");
    });
  };
  
  const createOrderDb = async () => {
    try {
      const { data } = await axios.post(`${url}/orders/add-order`, {order});
      if (data.success) {
        toastFire(true, data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Payment Confirmation
        </h2>
        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
          <p>Total:</p>
          <p>${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
        <PayPalScriptProvider options={{ "client-id": `${import.meta.env.VITE_PAYPAL_ID}` }}>
          <PayPalButtons 
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
        <div className="flex justify-center mt-6">
          <button
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mr-4"
            onClick={() => navigate("/allProducts")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
