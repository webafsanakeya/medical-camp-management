import { motion } from "framer-motion";

const events = [
  { _id: "1", name: "Free Dental Checkup", date: "2025-11-05", location: "City Hospital" },
  { _id: "2", name: "Eye Camp", date: "2025-11-12", location: "Community Center" },
  { _id: "3", name: "Vaccination Drive", date: "2025-11-20", location: "Local Clinic" },
];

const UpcomingEvents = () => {
  return (
    <section className="w-full py-12 bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Upcoming Events</h2>
          <p className="mt-2 text-sm text-gray-600">Don’t miss our health events</p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {events.map((event) => (
            <motion.div
              key={event._id}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white shadow-xl rounded-full flex flex-col items-center justify-center p-8 h-64 w-64 mx-auto text-center hover:shadow-2xl transition-shadow duration-300"
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
