import { motion } from "framer-motion";
import ReviewCard from "@/components/Home/ReviewCard";

const staticReviews = [
  {
    _id: "1",
    name: "John Doe",
    date: "2025-10-15",
    rating: 5,
    feedback: "The medical camp was very well organized. The staff was friendly and helpful.",
  },
  {
    _id: "2",
    name: "Jane Smith",
    date: "2025-10-16",
    rating: 4,
    feedback: "Good experience overall, though the waiting time was a bit long.",
  },
  {
    _id: "3",
    name: "Michael Johnson",
    date: "2025-10-18",
    rating: 5,
    feedback: "Excellent service! Very professional and caring staff.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const PublicFeedbacks = () => {
  return (
    <section className="w-full py-12 bg-gray-100">
      {/* Full-width background */}
      <div className="w-full bg-gray-100 py-12">
        {/* Centered container for cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Public Feedbacks
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Here are some reviews from our visitors
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {staticReviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PublicFeedbacks;
