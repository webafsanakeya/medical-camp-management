import { motion } from "framer-motion";
import { FaTint, FaRunning, FaAppleAlt } from "react-icons/fa";

const tips = [
  { _id: "1", title: "Stay Hydrated", description: "Drink at least 8 glasses of water daily.", icon: <FaTint size={32} className="text-white" /> },
  { _id: "2", title: "Exercise Regularly", description: "Do at least 30 minutes of exercise daily.", icon: <FaRunning size={32} className="text-white" /> },
  { _id: "3", title: "Eat Healthy", description: "Include fruits and vegetables in your diet.", icon: <FaAppleAlt size={32} className="text-white" /> },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const HealthTips = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-yellow-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Health Tips</h2>
          <p className="mt-2 text-gray-600">Quick tips for a healthy life</p>
        </div>

        {/* Tips Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center"
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
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`bg-gradient-to-br p-6 rounded-2xl shadow-xl hover:shadow-2xl flex flex-col items-center justify-center text-center text-white ${
                index === 0
                  ? "from-green-400 to-green-500"
                  : index === 1
                  ? "from-blue-400 to-blue-500"
                  : "from-pink-400 to-pink-500"
              }`}
            >
              <div className="mb-4">{tip.icon}</div>
              <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
              <p className="text-white text-sm">{tip.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HealthTips;
