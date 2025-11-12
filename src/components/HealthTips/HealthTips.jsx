import { motion } from "framer-motion";
import { FaTint, FaRunning, FaAppleAlt } from "react-icons/fa";

const tips = [
  {
    _id: "1",
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily.",
    icon: <FaTint size={28} />,
  },
  {
    _id: "2",
    title: "Exercise Regularly",
    description: "Do at least 30 minutes of exercise daily.",
    icon: <FaRunning size={28} />,
  },
  {
    _id: "3",
    title: "Eat Healthy",
    description: "Include fruits and vegetables in your diet.",
    icon: <FaAppleAlt size={28} />,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const HealthTips = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-br from-teal-50 via-cyan-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* --- Section Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
            Health Tips
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Quick tips for a healthier, happier you 🌱
          </p>
        </div>

        {/* --- Tips Grid --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tips.map((tip, index) => (
            <motion.div
              key={tip._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative flex flex-col items-center text-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border border-gray-100"
            >
              {/* --- Gradient Icon Circle --- */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md mb-4">
                {tip.icon}
              </div>

              {/* --- Title & Description --- */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {tip.description}
              </p>

              {/* --- Decorative Gradient Line --- */}
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-teal-500 to-cyan-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HealthTips;
