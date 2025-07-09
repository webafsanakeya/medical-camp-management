import { Stethoscope, Syringe, HeartPulse, Hospital, UserPlus, MapPinCheck } from "lucide-react"
import ServiceCard from "./ServiceCard"

const services = [
  {
    icon: <Stethoscope className="h-6 w-6 text-blue-600" />,
    title: "Free Checkups",
    description: "General physical checkups by qualified doctors and nurses.",
  },
  {
    icon: <Syringe className="h-6 w-6 text-green-600" />,
    title: "Vaccination Drives",
    description: "Mass immunization against common diseases for all age groups.",
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-red-600" />,
    title: "Chronic Care",
    description: "Monitoring and support for diabetes, hypertension, and heart diseases.",
  },
  {
    icon: <Hospital className="h-6 w-6 text-purple-600" />,
    title: "Minor Treatments",
    description: "On-site first aid, dressing, and basic medication dispensing.",
  },
  {
    icon: <UserPlus className="h-6 w-6 text-pink-600" />,
    title: "Registration & Records",
    description: "Digital patient records with easy follow-up scheduling.",
  },
  {
    icon: <MapPinCheck className="h-6 w-6 text-pink-600"/>,
    title: "Remote Camp Setup",
    description: "Deployable health camps in rural or hard-to-reach areas.",
  }
  
]

export default function CampServices() {
return (
    <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Our Camp Services</h2>
            <p className="text-muted-foreground mb-10">
          Medical services tailored for remote outreach, health awareness, and timely care.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx)=>(
              <ServiceCard 
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}/>
           
            ))}

        </div>

        </div>
    </section>
)
}
