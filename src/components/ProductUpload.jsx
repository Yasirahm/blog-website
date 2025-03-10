import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert

const adminEmails = ["ratherseenu16@gmail.com", "zufaizsaneen@gmail.com"];

const ProductUpload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(""); // Changed from price to date
  const [imageUrl, setImageUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && adminEmails.includes(user.email)) {
        setIsAdmin(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    try {
      await addDoc(collection(db, "products"), {
        name: name || "", // Optional fields
        description: description || "",
        details: details || "",
        date: date || "", // Changed from price to date
        imageUrl: imageUrl || "",
      });

      Swal.fire({
        icon: "success",
        title: "Product Uploaded!",
        text: "Your product has been successfully added.",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.reload(); // Reload page
      });

      // Clear input fields
      setName("");
      setDescription("");
      setDetails("");
      setDate(""); // Reset date field
      setImageUrl("");
      setShowForm(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
      });
    }
  };

  if (loading) return <p className="text-center">Checking access...</p>;
  if (!isAdmin) return null;

  return (
    <div className="relative">
      {/* Floating Upload Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
      >
        {showForm ? <FaTimes size={24} /> : <FaPlus size={24} />}
      </button>

      {/* Product Upload Form */}
      {showForm && (
        <motion.div
          className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Upload Blog</h3>

          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Detailed Info"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>

          <input
            className="w-full mb-2 p-2 border rounded"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          {imageUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Image Preview:</p>
              <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-md" />
            </div>
          )}

          <button
            className="w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600 transition duration-300"
            onClick={handleUpload}
          >
            Upload
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProductUpload;
