import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "./Footer";
import Header from "./Header";

const ADMIN_EMAILS = ["ratherseenu16@gmail.com", "zufaizsaneen@gmail.com"];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email)) {
        setUser(currentUser);
        setIsAdmin(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such product!");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center  text-gray-100">Loading...</p>;

  return (
    <>
    <Header/>
  
    <div className="max-w-5xl mx-auto p-6 bg-gray-200 shadow-4xl rounded-lg flex flex-col gap-6">
      <h3 className="text-4xl font-bold text-gray-900 text-center mb-4">{product.name}</h3>
      
      {product.imageUrls && product.imageUrls.length > 0 && (
        <div className="flex justify-center m-10 p-3 overflow-x-auto space-x-4 mb-6">
          {product.imageUrls.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product Image ${index + 1}`}
              className="w-[300px] h-[250px] object-cover rounded-md"
            />
          ))}
        </div>
      )}

      <div className="prose max-w-none text-gray-800">
        {product.description && <p className="text-lg">{product.description}</p>}
        {product.details && <p className="text-lg">{product.details}</p>}
        {product.content && <p className="text-lg">{product.content}</p>}

        {product.sections && product.sections.length > 0 && (
          <div className="mt-4">
            {product.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-2xl font-semibold text-gray-900">{section.heading}</h4>
                <p className="text-gray-700 text-lg leading-relaxed">{section.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {product.iframes && product.iframes.length > 0 && (
        <div className="mt-4 flex flex-col items-center gap-4">
          {product.iframes.map((iframeUrl, index) => (
            <iframe
              key={index}
              src={iframeUrl}
              className="w-full max-w-3xl h-64 border rounded-md"
              title={`Embedded Content ${index + 1}`}
              allowFullScreen
            ></iframe>
          ))}
        </div>
      )}

      

      {isAdmin && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={() => navigate(`/admin/edit/${id}`)}
          >
            Edit
          </button>
        </div>
      )}
      <Footer/>
    </div>
    </>
  );
};

export default ProductDetails;