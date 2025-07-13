
import JoinCampModal from "@/components/Modal/JoinCampModal";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Shared/Container";
import Heading from "@/components/ui/Shared/Heading";
import { useState } from "react";

const CampDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Image */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className="object-cover w-full h-full"
              src="https://i.ibb.co/jZj7czLC/5063406.jpg"
              alt="Medical Camp"
            />
          </div>
        </div>

        {/* Camp Details */}
        <div className="flex-1 flex flex-col gap-4">
          <Heading
            title="Health Check-Up Camp"
            subtitle="General Medical Outreach"
          />

          <div className="text-neutral-700 space-y-2">
            <p><span className="font-semibold">📍 Location:</span> Dhaka, Bangladesh</p>
            <p><span className="font-semibold">📅 Date & Time:</span> 25 July 2025, 10:00 AM – 4:00 PM</p>
            <p><span className="font-semibold">💰 Camp Fee:</span> Free</p>
            <p><span className="font-semibold">👨‍⚕️ Healthcare Professional:</span> Dr. Afsana Karim (General Physician)</p>
            <p><span className="font-semibold">👥 Participants Registered:</span> 125</p>
          </div>

          <div>
            <p className="text-neutral-600 mt-4">
              Join our community healthcare camp focused on general wellness.
              Services include basic health screenings, consultations, blood
              pressure checks, and health education sessions. Open to all age
              groups. Early registration recommended!
            </p>
          </div>

          <div className="mt-6">
            <Button label="Join Camp" onClick={() => setIsOpen(true)} />
          </div>

          <JoinCampModal isOpen={isOpen} closeModal={closeModal} />
        </div>
      </div>
    </Container>
  );
};

export default CampDetails;
