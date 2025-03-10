import React from "react";
import ProductUpload from "../components/ProductUpload";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Feedback from "../../../ah/src/components/Feedback";
import Contact from "../components/Contact";
import Footer from "../components/Footer";



const Home = ({ productListRef }) => {
  return (
    <>
      <Header/>
      
      <ProductUpload />
      
      
    <div className=" bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 p-6">
    
    
     
      {/* Product List Section */}
      <div className="container mx-auto">
        <ProductList />
        <Feedback/>
        <Contact/>
        <Footer/>
      </div>
    </div>
    </>
  );
};

export default Home;
