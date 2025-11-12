import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineSearch,
  HiOutlinePencilAlt,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

const steps = [
  {
    icon: HiOutlineSearch,
    title: "1. Find a Camp",
    description:
      "Browse our list of upcoming medical camps and find one that's convenient for you.",
  },
  {
    icon: HiOutlinePencilAlt,
    title: "2. Register Online",
    description:
      "Sign up with your details to secure your spot. It's quick, easy, and free.",
  },
  {
    icon: HiOutlineClipboardCheck,
    title: "3. Attend & Get Care",
    description:
      "Visit the camp on the scheduled date and get the health services you need.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get started in just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          className="relative flex flex-col md:flex-row md:items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Vertical line for mobile */}
          <div className="absolute md:hidden top-16 left-8 w-1 h-full bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative flex md:flex-1 flex-col items-center text-center md:text-left md:odd:pr-8 md:even:pl-8"
            >
              {/* Icon */}
              <div className="flex justify-center md:justify-start mb-6 relative z-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg ring-8 ring-white">
                  <step.icon className="w-8 h-8" />
                </div>
              </div>

              {/* Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md md:shadow-lg transition-all duration-300 w-full md:max-w-sm -mt-6 md:-mt-12">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Horizontal connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 -z-10"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
