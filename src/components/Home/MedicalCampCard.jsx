import { Link } from "react-router";
import { motion } from "framer-motion";

const MedicalCampCard = ({ camp }) => {
  const {
    _id,
    campName,
    dateTime,
    location,
    doctor,
    participantCount,
    image,
    fees,
    description,
  } = camp || {};

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col"
      whileHover={{ scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden">
        <motion.img
          src={image || "/placeholder.jpg"}
          alt={campName}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{campName}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">{new Date(dateTime).toLocaleString()}</p>
        <p className="text-sm text-gray-600">
          <strong>Doctor:</strong> {doctor}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Fees:</strong> {fees ? `৳${fees}` : "Free"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Participants:</strong> {participantCount || 0}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2 mt-2">{description}</p>

        {/* Details Button */}
        <div className="mt-auto pt-4">
          <Link
            to={`/camp/${_id}`} // ✅ link fixed
            className="block w-full text-center py-2 rounded-full bg-lime-500 text-black font-semibold hover:bg-lime-600 hover:scale-105 transition-transform duration-300 shadow-md"
          >
            See Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalCampCard;
