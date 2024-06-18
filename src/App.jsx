import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  // useParams,
} from "react-router-dom";
// import ProductCard from "./components/ProductCard";
// import ProductPage from "./components/ProductPage";
// import ProductReviews from "./components/ProductReviews";
// import ProductsProvider from "./context/CartContextProduct.jsx";
import './App.css';
import Navbar from "./section/Navbar.jsx";
import AllProducts from "./components/products/AllProducts.jsx";
import Products from "./components/pages/publicPages/Products.jsx";
import Cart from "./components/cart/Cart.jsx";

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}


function App() {
  // let {categoryId} = useParams()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/allProducts" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryId" element={<Products />} />
        {/* <Route path="/page" element={<ProductPage />} /> */}
        {/* <Route path="/card" element={<ProductCard />} /> */}
        {/* <Route path="/reviews" element={<ProductReviews />} /> */}
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
