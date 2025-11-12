import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineHeart } from "react-icons/hi";
import { FaRegHospital } from "react-icons/fa";

// --- Feature List ---
const features = [
  {
    icon: HiOutlineShieldCheck,
    title: "Free Check-ups",
    description: "Early detection and comprehensive care for all.",
  },
  {
    icon: FaRegHospital,
    title: "Vaccinations",
    description: "Protecting communities with essential vaccines.",
  },
  {
    icon: HiOutlineHeart,
    title: "Health Awareness",
    description: "Promoting healthy lifestyles and well-being.",
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="relative overflow-hidden bg-gray-50 py-20">
      {/* Gradient background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-white opacity-70 pointer-events-none"></div>

      {/* Content wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* --- Left Column: Text --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
            About MediCamp
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            Bringing healthcare directly to communities that need it most.
          </p>

          <p className="mt-6 text-lg leading-7 text-gray-700">
            Our medical camps provide check-ups, vaccinations, and
            life-saving treatments — giving hope and smiles to
            thousands every year. We are committed to making a difference,
            one camp at a time.
          </p>

          {/* --- Gradient CTA Button --- */}
          <motion.button
            onClick={() => navigate("/available-camps")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-flex items-center gap-2 px-8 py-3 text-base font-semibold text-white rounded-xl shadow-md 
              bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 
              hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Join Our Next Camp
          </motion.button>
        </motion.div>

        {/* --- Right Column: Features --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Gradient icon circle */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md mb-4">
                <feature.icon className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
