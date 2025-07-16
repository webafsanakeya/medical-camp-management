import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";

const ParticipantRegisterDataRow = ({ register }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const {
    campName,
    participantCount,
    status,
    fees,
    campImage,
  } = register;

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

      {/* Date & Time */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {participantCount}
        </p>
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

      {/* Action - Cancel */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition"
        >
          Cancel
        </button>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  );
};

export default ParticipantRegisterDataRow;
