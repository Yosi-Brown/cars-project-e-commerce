import { createContext, useEffect, useState } from "react";
import { toastFire } from "../utils/Toaster";


const url = import.meta.env.VITE_URL;

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOrderPage, setIsOrderPage] = useState(false)

  // פונקציה לעדכון העגלה ולשמירה ב-local storage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // פונקציה להוספת מוצר לעגלה
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item

      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    updateCart(updatedCart);
    toastFire(true, "added to cart")
  };

  // פונקציה להגדלת הכמות של מוצר בעגלה
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // פונקציה להקטנת הכמות של מוצר בעגלה
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCart(updatedCart);
  };

  // פונקציה להסרת מוצר מהעגלה
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    updateCart(updatedCart);
  };

  // פונקציה למחיקת כל הפריטים מהעגלה
  const clearCart = () => {
    setCart([]); 
    localStorage.removeItem('cart'); 
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const value = {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart, 
    isOrderPage,
    setIsOrderPage,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
