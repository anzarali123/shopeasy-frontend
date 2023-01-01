import { Route, Routes } from "react-router-dom";
import { Header, Footer, AdminOnlyRoute } from "./components";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  OrderHistory,
  Cart,
  Admin,
} from "./pages";
import Checkout from "./pages/checkout/Checkout";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import NotFound from "./pages/notFound/NotFound";
import OrderDetails from "./pages/orderDetails/OrderDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-details" element={<CheckoutDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/review-product/:id" element={<ReviewProducts />} />
        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
