import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className=" p-6 rounded-lg shadow-lg text-center">
        <h2 className="lg:text-2xl text-lg font-semibold mb-4"></h2>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          <FaSignOutAlt className="mr-2 text-center" /> Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
