import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    date: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        alert("Product not found!");
        navigate("/");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, product);
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border border-gray-400 rounded-md"
          required
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full p-2 border border-gray-400 rounded-md"
          required
        ></textarea>

        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-400 rounded-md"
          required
        />

        <input
          type="text"
          name="date"
          value={product.date}
          onChange={handleChange}
          placeholder="Date"
          className="w-full p-2 border border-gray-400 rounded-md"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
