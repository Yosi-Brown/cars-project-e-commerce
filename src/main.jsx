import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalProvider from "./contexts/GlobalContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </GlobalProvider>
);
