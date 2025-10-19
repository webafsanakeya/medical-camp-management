import { useState } from "react";
import { Dialog } from "@headlessui/react";

const FeedbackModal = ({ isOpen, closeModal, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = () => {
    if (!rating) return alert("Please provide a rating");
    onSubmit(rating, feedbackText);
    setRating(0);
    setFeedbackText("");
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded max-w-md mx-auto p-6 z-20 w-full">
          <Dialog.Title className="text-lg font-bold mb-4">Give Feedback</Dialog.Title>

          {/* Star Rating */}
          <div className="flex space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Feedback Text */}
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="Write your feedback..."
          />

          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FeedbackModal;
