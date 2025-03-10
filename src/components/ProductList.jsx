import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import About from "./About";
import Hero from "./Hero";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAdmin(
        user?.email === "ratherseenu16@gmail.com" ||
        user?.email === "zufaizsaneen@gmail.com"
      );
    });

    return () => unsubscribe();
  }, [auth]);

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Hero/>
      <div className="max-w-6xl mx-auto p-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border-2 border-gray-100 bg-black rounded-md"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border-2 bg-gray-100 border-gray-500 shadow-2xl shadow-gray-500 rounded-lg p-4 relative cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-sm text-right font-bold text-gray-600">
                Date: {product.date}
              </p>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-product/${product.id}`);
                    }}
                    className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
                    title="Edit Product"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id);
                    }}
                    className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
                    title="Delete Product"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <About />
    </>
  );
};

export default ProductList;
