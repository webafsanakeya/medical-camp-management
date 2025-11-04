import { motion } from "framer-motion";

// Sample doctor data with images
const doctors = [
  { 
    _id: "1", 
    name: "Dr. Sarah Connor", 
    specialization: "Cardiologist", 
    availability: "Mon-Fri", 
    image: "/doctor-1.jpg" // public folder reference
  },
  { 
    _id: "2", 
    name: "Dr. James Wilson", 
    specialization: "Pediatrician", 
    availability: "Tue-Thu", 
    image: "/doctor-2.jpg"
  },
  { 
    _id: "3", 
    name: "Dr. Lisa Ray", 
    specialization: "Dermatologist", 
    availability: "Mon-Wed", 
    image: "/doctor-3.jpg"
  },
];

const PopularDoctors = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Popular Doctors</h2>
          <p className="mt-2 text-gray-600">Meet our top-rated doctors</p>
        </div>

        {/* Doctor Cards Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doctor, idx) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {/* Doctor Image */}
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-gray-700">{doctor.specialization}</p>
                  <p className="text-gray-500 text-sm">{doctor.availability}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDoctors;
