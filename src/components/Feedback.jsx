import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaTrash, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";

const Feedback = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const adminEmail = "ratherseenu16@gmail.com";

  // Fetch Feedback from Firebase
  useEffect(() => {
    const fetchFeedback = async () => {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const feedbackData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbackList(feedbackData);
    };

    fetchFeedback();
  }, []);

  // Submit Feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !rating || !comment.trim()) {
      Swal.fire("Error", "Please enter your name, rating, and comment!", "error");
      return;
    }

    try {
      await addDoc(collection(db, "feedback"), {
        name,
        rating,
        comment,
        timestamp: new Date().toISOString(),
      });
      Swal.fire("Success", "Thank you for your feedback!", "success");
      setName("");
      setComment("");
      setRating(0);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  // Delete Feedback (Admin Only)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "feedback", id));
          setFeedbackList(feedbackList.filter((feedback) => feedback.id !== id));
          Swal.fire("Deleted!", "The feedback has been removed.", "success");
        } catch (error) {
          console.error("Error deleting feedback:", error);
          Swal.fire("Error", "Could not delete feedback!", "error");
        }
      }
    });
  };

  // Navigation for feedback slider
  const nextFeedback = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackList.length);
  };

  const prevFeedback = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbackList.length) % feedbackList.length);
  };

  return (
    <div className="max-w-3xl text-gray-200 mx-auto p-6  shadow-2xl rounded-lg">
      <h2 className="lg:text-2xl text-xl font-bold text-white text-center mb-6">Feedback</h2>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-100 font-semibold">Your Name:</label>
          <input
            type="text"
            className="w-full text-black p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100 font-semibold">Rate Us:</label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Your Comment:</label>
          <textarea
            className="w-full text-black p-2 border rounded"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white  py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Submit Feedback
        </button>
      </form>

      {/* Display Feedback */}
      <div className="mt-6 relative flex justify-center items-center">
        {feedbackList.length > 0 && (
          <>
            <button onClick={prevFeedback} className="absolute left-0 text-white text-2xl">
              <FaArrowLeft />
            </button>

            <div className="p-4 bg-gray-200 shadow-2xl text-black rounded-lg w-80 text-center">
              <p className="font-semibold text-lg">{feedbackList[currentIndex].name}</p>
              <div className="flex justify-center gap-1 text-yellow-500">
                {[...Array(feedbackList[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="mt-2">{feedbackList[currentIndex].comment}</p>
              {adminEmail === "ratherseenu16@gmail.com" && (
                <button
                  onClick={() => handleDelete(feedbackList[currentIndex].id)}
                  className="text-red-500 mt-2 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </div>

            <button onClick={nextFeedback} className="absolute right-0 text-white text-2xl">
              <FaArrowRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;
