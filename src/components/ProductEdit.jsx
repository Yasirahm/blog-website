import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const ADMIN_EMAILS = ["ratherseenu16@gmail.com", "zufaizsaneen@gmail.com"];

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    details: "",
    price: "",
    image:"",
    content: "",
    imageUrls: [],
    iframes: [], // New iframe field
    sections: [{ heading: "", description: "" }], // Multiple headings & descriptions
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email)) {
        setUser(currentUser);
        setIsAdmin(true);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({
          ...docSnap.data(),
          imageUrls: docSnap.data().imageUrls || [],
          iframes: docSnap.data().iframes || [],
          sections: docSnap.data().sections || [{ heading: "", description: "" }],
        });
      } else {
        console.log("No such product!");
      }
    };
    fetchProduct();
  }, [id, isAdmin]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...product.imageUrls];
    updatedImages[index] = value;
    setProduct({ ...product, imageUrls: updatedImages });
  };

  const addImageField = () => {
    setProduct({ ...product, imageUrls: [...product.imageUrls, ""] });
  };

  const removeImageField = (index) => {
    const updatedImages = [...product.imageUrls];
    updatedImages.splice(index, 1);
    setProduct({ ...product, imageUrls: updatedImages });
  };

  const handleIframeChange = (index, value) => {
    const updatedIframes = [...product.iframes];
    updatedIframes[index] = value;
    setProduct({ ...product, iframes: updatedIframes });
  };

  const addIframeField = () => {
    setProduct({ ...product, iframes: [...product.iframes, ""] });
  };

  const removeIframeField = (index) => {
    const updatedIframes = [...product.iframes];
    updatedIframes.splice(index, 1);
    setProduct({ ...product, iframes: updatedIframes });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...product.sections];
    updatedSections[index][field] = value;
    setProduct({ ...product, sections: updatedSections });
  };

  const addSection = () => {
    setProduct({ ...product, sections: [...product.sections, { heading: "", description: "" }] });
  };

  const removeSection = (index) => {
    const updatedSections = [...product.sections];
    updatedSections.splice(index, 1);
    setProduct({ ...product, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "products", id), product);
      Swal.fire({
        icon: "success",
        title: "Blog Updated!",
        text: "Blog updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      navigate(`/product/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Failed to update blog. Please try again.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-sm text-yellow-800">Blog Title</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border-2 rounded-md" required />

        <label className="text-sm text-yellow-800">Short Description</label>
        <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border-2 rounded-md" required />

        <label className="text-sm text-yellow-800">Details</label>
        <textarea name="details" value={product.details} onChange={handleChange} className="w-full p-2 border-2 rounded-md" required />

        <label className="text-sm text-yellow-800">Blog Content</label>
        <textarea name="content" value={product.content} onChange={handleChange} className="w-full p-2 border-2 rounded-md h-40" />
{/* Image Fields */}
{product.imageUrls.map((url, index) => (
          <div key={index} className="flex items-center  space-x-2">
            <input type="text" value={url} onChange={(e) => handleImageChange(index, e.target.value)} className="w-full p-2 border-2 rounded-md" required />
            <button type="button" onClick={() => removeImageField(index)} className="bg-red-500 text-white px-2 py-1 rounded-md">❌</button>
          </div>
        ))}
        <button type="button" onClick={addImageField} className="bg-green-500 text-white px-3 py-1 rounded-md">➕ Add Image</button><br></br>
        <label className="text-sm text-yellow-800">Headings & Descriptions</label>
        {product.sections.map((section, index) => (
          <div key={index} className="border p-3 rounded-md mb-2">
            <input type="text" placeholder="Heading" value={section.heading} onChange={(e) => handleSectionChange(index, "heading", e.target.value)} className="w-full p-2 border rounded-md mb-2" />
            <textarea placeholder="Description" value={section.description} onChange={(e) => handleSectionChange(index, "description", e.target.value)} className="w-full p-2 border rounded-md" />
            <button type="button" onClick={() => removeSection(index)} className="bg-red-500 text-white px-2 py-1 rounded-md mt-2">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSection} className="bg-green-500 text-white px-3 py-1 rounded-md">➕ Add Section</button>
<br></br>
        <label className="text-sm text-yellow-800">Iframe URLs</label>
        {product.iframes.map((url, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input type="text" value={url} onChange={(e) => handleIframeChange(index, e.target.value)} className="w-full p-2 border-2 rounded-md" required />
            <button type="button" onClick={() => removeIframeField(index)} className="bg-red-500 text-white px-2 py-1 rounded-md">❌</button>
          </div>
        ))}
        <button type="button" onClick={addIframeField} className="bg-green-500 text-white px-3 py-1 rounded-md">➕ Add Iframe</button>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Save Changes</button>
      </form>
    </div>
  );
};

export default ProductEdit;
