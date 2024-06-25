import React, { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import './App.css';
import Navbar from "./section/Navbar.jsx";
import Products from "./components/pages/publicPages/Products.jsx";
import Cart from "./components/cart/Cart.jsx";
import OrderConfirmation from "./components/order/OrderConfirmation.jsx";
import Footer from "./section/Footer.jsx";
import Profile from "./components/profile/Profile.jsx";
import Form from "../src/components/login/logIn/Form.jsx"
import SignUp from "../src/components/login/registerUser/RegisterForm.jsx"
import ForgotPassword from "../src/components/forgatPassword/ForgotPassword.jsx"
import ChangePassword from "../src/components/forgatPassword/ChangePassword.jsx"
import { AuthContext } from "./contexts/AuthContext.jsx";
import Payment from "./components/payment/Payment.jsx";
import HomePage from "./components/pages/publicPages/homePage/HomePage.jsx";



function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


function App() {
  // let {categoryId} = useParams()
  const {isAuth} = useContext(AuthContext)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>

        <Route path="/homePage" element={<HomePage />} />
        <Route path="/allProducts" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryId" element={<Products />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to={"/login"}/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Form />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/payment" element={<Payment />} />

      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
