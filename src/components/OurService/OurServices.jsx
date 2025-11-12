import React from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaTooth, FaRegEye, FaHandHoldingHeart } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IoIosNutrition } from "react-icons/io";

// --- Services Data ---
const servicesList = [
  { icon: FaStethoscope, title: "Free Health Check-ups", description: "Comprehensive general health assessments to monitor and maintain your well-being." },
  { icon: FaTooth, title: "Dental Care", description: "Basic dental screenings, cleanings, and consultations for oral health." },
  { icon: FaRegEye, title: "Eye Examinations", description: "Vision tests and screenings for common eye conditions by certified optometrists." },
  { icon: HiOutlineShieldCheck, title: "Vaccinations", description: "Providing essential immunizations to protect against preventable diseases." },
  { icon: FaHandHoldingHeart, title: "Blood Donation Drive", description: "Organized drives for voluntary blood donation to support local hospitals and save lives." },
  { icon: IoIosNutrition, title: "Nutritional Counseling", description: "Guidance from dietitians on healthy eating habits and managing dietary needs." },
];

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

const OurServices = () => {
  return (
    <section id="services" className="bg-gradient-to-br from-teal-50 via-cyan-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-500 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">Comprehensive care provided at every camp.</p>
        </div>

        {/* --- Services Grid --- */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        >
          {servicesList.map((service) => (
            <motion.div key={service.title} variants={itemVariants} whileHover={{ scale: 1.05 }}
              className="group relative flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-teal-100 to-cyan-100 text-gray-800 shadow-lg transition-all duration-300 hover:from-teal-400 hover:to-cyan-500 hover:text-white hover:shadow-2xl"
            >
              {/* --- Icon --- */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-teal-300 to-cyan-300 mb-6 shadow-md transition-all duration-300 group-hover:from-teal-500 group-hover:to-cyan-400">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* --- Title --- */}
              <h3 className="text-xl font-semibold mb-2 text-center transition-colors duration-300 group-hover:text-white">
                {service.title}
              </h3>

              {/* --- Description --- */}
              <p className="text-center transition-colors duration-300 group-hover:text-white">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
