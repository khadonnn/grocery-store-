import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import { Home } from "lucide-react";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import SearchResults from "./pages/SearchResults";
import FlashDeals from "./pages/FlashDeals";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";
import Address from "./pages/Address";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        {/* Auth Routes - no navbar/footer */}
        <Route path="/login" element={<Login />} />
        {/* Main Routes - with navbar/footer */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="deals" element={<FlashDeals />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="address" element={<Address />} />
          </Route>
        </Route>
        <Route path="/search" element={<div>Search</div>} />
        <Route path="/search-results" element={<div>SearchResults</div>} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1b3022",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
};

export default App;
