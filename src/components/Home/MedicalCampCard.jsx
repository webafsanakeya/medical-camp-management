import { Link } from "react-router";


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
    <div className="group shadow-md hover:shadow-lg transition rounded-xl overflow-hidden bg-white flex flex-col">
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={campName}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{campName}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">
          {new Date(dateTime).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Doctor:</strong> {doctor}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Fees:</strong> {fees ? `৳${fees}` : "Free"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Participants:</strong> {participantCount || 0}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2 mt-2">
          {description}
        </p>

        {/* Details Button */}
        <div className="mt-auto pt-4">
          <Link
            to={`/camp/${_id}`}
            className="block w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold text-center py-2 rounded-md transition"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicalCampCard;
