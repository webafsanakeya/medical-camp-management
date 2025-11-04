import { motion } from "framer-motion";

const events = [
  { _id: "1", name: "Free Dental Checkup", date: "2025-11-05", location: "City Hospital" },
  { _id: "2", name: "Eye Camp", date: "2025-11-12", location: "Community Center" },
  { _id: "3", name: "Vaccination Drive", date: "2025-11-20", location: "Local Clinic" },
];

const UpcomingEvents = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="mt-2 text-gray-600">Don’t miss our health events</p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {events.map((event, idx) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-8 h-64 w-64 text-center hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h3>
              <p className="text-gray-700 mb-1">{event.date}</p>
              <p className="text-gray-500 text-sm">{event.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
