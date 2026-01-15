import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Root/Layout";
import { ToastContainer } from "react-toastify";

import EcommerceApp from "./Pages/LandingPage";
import AboutPage from "./Pages/AboutPage";
import ContactPageApp from "./Pages/ContactPage";
import LoginPage from "./Pages/AuthPage/LoginPage";
import SignupPage from "./Pages/AuthPage/SignupPage";
import AdminLogin from "./Pages/AuthPage/AdminLoginPage";
import UserPage from "./Pages/UserPage";
import CartPage from "./Pages/CartPage";
import AdminPage from "./Pages/AdminPage";

import ProductPage from "./Pages/AdminPages/ProductPage";
import OrderPage from "./Pages/AdminPages/OrderPage";
import SettingPage from "./Pages/AdminPages/SettingPage";
import SingleProductPage from "./Pages/SingleProductPage";
import OrderListPage from "./Pages/OrderListPage";
import AdminDashboard from "./Pages/AuthPage/AdminDashboard";
import ProductsPage from "./Pages/AllProductPage";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<EcommerceApp />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPageApp />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="user-page" element={<UserPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="allProductPage" element={<ProductsPage />} />
        <Route
          path="single-product-page/:slug"
          element={<SingleProductPage />}
        />

        <Route path="order-list-page" element={<OrderListPage />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/products" element={<ProductPage />} />
        <Route path="admin/orders" element={<OrderPage />} />
        <Route path="admin/settings" element={<SettingPage />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
    </>
  );
}

export default App;
