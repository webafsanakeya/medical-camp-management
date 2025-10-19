import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import FeedbackModal from "../../Modal/FeedbackModal";
import axios from "axios";

const ParticipantRegisterDataRow = ({ register, refetch }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const closeDeleteModal = () => setIsDeleteOpen(false);
  const closeFeedbackModal = () => setIsFeedbackOpen(false);

  const {
    _id,
    campId,
    campName,
    participantCount,
    status,
    fees,
    campImage,
    paymentStatus, // assuming you track payment status
    participantEmail,
    participantName
  } = register;

  const handleFeedbackSubmit = async (rating, feedbackText) => {
    try {
      await axios.post("/api/feedback", {
        campId,
        registerId: _id,
        participantEmail,
        participantName,
        rating,
        feedback: feedbackText
      });
      closeFeedbackModal();
      refetch();
      alert("Feedback submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  return (
    <tr>
      {/* Camp Image */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              alt="camp"
              src={campImage}
              className="mx-auto object-cover rounded h-16 w-24"
            />
          </div>
        </div>
      </td>

      {/* Camp Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-medium">
          {campName}
        </p>
      </td>

      {/* Participant Count */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{participantCount}</p>
      </td>

      {/* Camp Fee */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">$ {fees}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-200 text-yellow-800 rounded-full">
          {status}
        </span>
      </td>

      {/* Action */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="inline-flex items-center px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition"
        >
          Cancel
        </button>

        {/* Show Feedback only if payment completed */}
        {paymentStatus === "paid" && (
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="inline-flex items-center px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition"
          >
            Feedback
          </button>
        )}

        <DeleteModal isOpen={isDeleteOpen} closeModal={closeDeleteModal} />
        <FeedbackModal
          isOpen={isFeedbackOpen}
          closeModal={closeFeedbackModal}
          onSubmit={handleFeedbackSubmit}
        />
      </td>
    </tr>
  );
};

export default ParticipantRegisterDataRow;
