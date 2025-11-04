import React from "react";
import { FaHeartbeat, FaUsers, FaHandsHelping } from "react-icons/fa";

export default function About() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-lime-700 mb-4">
            About MediCamp
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Bringing healthcare closer to communities in need through compassion, collaboration, and care.
          </p>
        </div>

        {/* Image + Description */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2">
            <img
              src="https://i.ibb.co.com/jZj7czLC/5063406.jpg"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 text-gray-700">
            <p className="mb-4">
              MediCamp is dedicated to connecting healthcare professionals with communities in need. We organize camps that provide free consultations, treatments, and health education.
            </p>
            <p className="mb-4">
              Each camp is designed to make a meaningful impact, one patient at a time. Join us as a volunteer, sponsor, or participant to help create healthier communities.
            </p>
            <p>
              Compassion, collaboration, and care guide everything we do. Together, we can make healthcare accessible to all.
            </p>
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <FaHeartbeat className="mx-auto text-4xl text-lime-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible and quality healthcare through organized medical camps.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <FaUsers className="mx-auto text-4xl text-lime-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              A healthier community where everyone can access essential medical services.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <FaHandsHelping className="mx-auto text-4xl text-lime-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-600">
              Compassion, integrity, and collaboration guide everything we do.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            Be part of our mission to improve healthcare access. Your support helps us reach more communities.
          </p>
          <a
            href="/signup"
            className="inline-block px-6 py-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
}
