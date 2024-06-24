import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { toastFire } from '../../utils/Toaster';

const url = import.meta.env.VITE_URL

function Payment() {
  const { currentUser } = useContext(GlobalContext);  
  const { cart } = useContext(CartContext);

  // console.log(cart);

  const order = {
    user: currentUser._id,
    products: cart.map(product => ({
      product: product._id,
      quantity: product.quantity
    }))
  };
  console.log(order.products);

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
      // alert('Transaction completed by ' + details.payer.name.given_name);
      createOrderDb()
      // כאן אתה יכול לטפל באישור התשלום ולשלוח את המידע לשרת שלך
      // console.log("details", details);
    });
  };
  
  const createOrderDb = async () => {
    console.log('1db');
    try {
      const { data } = await axios.post(`${url}/orders/add-order`, {order})
      console.log(order);
      if(data.success){
        toastFire(true, data.message)
        // console.log('comlited');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="text-center">
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
      </div>
    </div>
  );
}

export default Payment;
