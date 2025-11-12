import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

// --- Default FAQ Data ---
const defaultItems = [
  {
    title: "Camp Details",
    content:
      "This camp is held in Dhaka from 10 AM to 4 PM. Make sure to carry your ID and registration confirmation.",
  },
  {
    title: "Payment Information",
    content:
      "You can pay via Stripe, Bkash, or Rocket. Payments must be completed 24 hours before joining the camp.",
  },
  {
    title: "Feedback",
    content:
      "Your feedback matters! Please provide feedback after attending to help us improve future camps.",
  },
  {
    title: "Guidelines",
    content:
      "Follow all safety protocols, wear masks if required, and maintain social distancing during the camp.",
  },
];

// --- Animation Variants ---
const panelVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.35, ease: "easeInOut" },
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

// --- Accordion Component ---
const Accordion = ({ items }) => {
  const displayItems = items && items.length > 0 ? items : defaultItems;
  const [expanded, setExpanded] = useState(0);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* --- Title --- */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Find answers to common questions about our medical camps.
          </p>
        </div>

        {/* --- Accordion Container --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          {displayItems.map((item, index) => {
            const isOpen = expanded === index;
            return (
              <motion.div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                  isOpen
                    ? "bg-gradient-to-r from-teal-50 via-cyan-50 to-white border border-teal-200 shadow-md"
                    : "bg-white border border-gray-200 hover:shadow-md"
                }`}
              >
                {/* --- Accordion Header --- */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 focus:outline-none"
                >
                  <span
                    className={`text-lg font-medium text-left transition-colors ${
                      isOpen
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent"
                        : "text-gray-800 hover:text-teal-600"
                    }`}
                  >
                    {item.title}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-full transition-colors ${
                      isOpen
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <HiChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* --- Accordion Panel --- */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={panelVariants}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Accordion;
