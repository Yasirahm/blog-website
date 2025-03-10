import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
// Lazy-loaded pages & components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));

const ProductEdit = lazy(() => import("./components/ProductEdit"));

const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));


// Fallback UI with Spinner
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  </div>
);

const App = () => {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 animated-gradient">
      {/* Wrap all routes inside Suspense */}
      <Suspense fallback={<Loading />}>
      
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
   
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/header" element={<Header />} />
          <Route path="/product/:id" element={<ProductDetails />} />
   
          <Route path="/admin/edit/:id" element={<ProductEdit />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
    
        </Routes>
        
      </Suspense>
    </div>
  );
};

export default App;
