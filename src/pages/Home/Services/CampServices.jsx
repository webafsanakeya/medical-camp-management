import { Stethoscope, Syringe, HeartPulse, Hospital, UserPlus, MapPinCheck } from "lucide-react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: <Stethoscope className="h-6 w-6 text-blue-600" />,
    title: "Free Checkups",
    description: "General physical checkups by qualified doctors and nurses.",
    bg: "bg-blue-100/50",
  },
  {
    icon: <Syringe className="h-6 w-6 text-green-600" />,
    title: "Vaccination Drives",
    description: "Mass immunization against common diseases for all age groups.",
    bg: "bg-green-100/50",
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-red-600" />,
    title: "Chronic Care",
    description: "Monitoring and support for diabetes, hypertension, and heart diseases.",
    bg: "bg-red-100/50",
  },
  {
    icon: <Hospital className="h-6 w-6 text-purple-600" />,
    title: "Minor Treatments",
    description: "On-site first aid, dressing, and basic medication dispensing.",
    bg: "bg-purple-100/50",
  },
  {
    icon: <UserPlus className="h-6 w-6 text-pink-600" />,
    title: "Registration & Records",
    description: "Digital patient records with easy follow-up scheduling.",
    bg: "bg-pink-100/50",
  },
  {
    icon: <MapPinCheck className="h-6 w-6 text-amber-600" />,
    title: "Remote Camp Setup",
    description: "Deployable health camps in rural or hard-to-reach areas.",
    bg: "bg-amber-100/50",
  },
];

export default function CampServices() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Our Camp Services</h2>
        <p className="text-gray-600 mb-10">
          Medical services tailored for remote outreach, health awareness, and timely care.
        </p>
      </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`rounded-xl p-6 shadow-lg ${service.bg} cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300`}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
