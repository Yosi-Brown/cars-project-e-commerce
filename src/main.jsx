import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalProvider from "./contexts/GlobalContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import FavoritiesProvider from "./contexts/FavoritesContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <AuthProvider>
      <CartProvider>
        <FavoritiesProvider>
        <App />
        <Toaster />
        </FavoritiesProvider>
      </CartProvider>
    </AuthProvider>
  </GlobalProvider>
);
