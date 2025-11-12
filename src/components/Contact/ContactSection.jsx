import React from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: HiOutlineLocationMarker,
    title: "Address",
    text: "Dhaka, Bangladesh",
  },
  {
    icon: HiOutlinePhone,
    title: "Call Us",
    text: "+880 2233445566",
  },
  {
    icon: HiOutlineMail,
    title: "Email Us",
    text: "support@mcms.com",
  },
];

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Have questions or want to partner with us? We'd love to hear from you.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {contactInfo.map((item) => (
              <div key={item.title} className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 text-white shadow-md">
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner transition duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner transition duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 shadow-inner transition duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-lg px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
