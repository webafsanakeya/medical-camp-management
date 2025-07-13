import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";

const ParticipantOrderDataRow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr>
      {/* Camp Image */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <img
              alt='camp'
              src='https://i.ibb.co/jZj7czLC/5063406.jpg'
              className='mx-auto object-cover rounded h-16 w-24'
            />
          </div>
        </div>
      </td>

      {/* Camp Name */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>Free Eye Camp</p>
      </td>

      {/* Date & Time */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>July 25, 2025 – 10:00 AM</p>
      </td>

      {/* Location */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>Dhaka Medical Center</p>
      </td>

      {/* Healthcare Professional */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>Dr. Shakil Ahmed</p>
      </td>

      {/* Camp Fee */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>$10</p>
      </td>

      {/* Status */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='inline-block px-2 py-1 text-xs font-semibold bg-yellow-200 text-yellow-800 rounded-full'>
          Pending
        </span>
      </td>

      {/* Action - Cancel */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='inline-flex items-center px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition'
        >
          Cancel
        </button>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  );
};

export default ParticipantOrderDataRow;