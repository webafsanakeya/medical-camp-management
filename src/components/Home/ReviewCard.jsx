import { motion } from "framer-motion";

const ReviewCard = ({ review }) => {
  const { name, date, rating, feedback } = review;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 inline-block ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.956c.3.922-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.049 9.382c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.955z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className="text-sm text-gray-500">
            • {new Date(date).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="mb-4">{renderStars()}</div>
      <div className="overflow-hidden relative h-16">
        <div className="absolute whitespace-nowrap animate-marquee">
          <p className="text-gray-700 text-sm">{feedback}</p>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ReviewCard;
