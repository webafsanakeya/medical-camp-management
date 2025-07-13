import JoinCampModal from "@/components/Modal/JoinCampModal";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Shared/Container";
import Heading from "@/components/ui/Shared/Heading";
import { useState } from "react";
import { useLoaderData } from "react-router";

const CampDetails = () => {
  const camp = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);

  console.log(camp);
  if(!camp || typeof camp !== 'object') return <p>We are Sorry!</p>
  const {
    _id,
    campName,
    dateTime,
    location,
    doctor,
    participantCount,
    fees,
    organizer,
    description,
    image,
  } = camp || {};
  

  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Image */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className="object-cover w-full h-full"
              src={image}
              alt="Medical Camp"
            />
          </div>
        </div>

        {/* Camp Details */}
        <div className="flex-1 flex flex-col gap-4">
          <Heading title={campName} />

          <div className="text-neutral-700 space-y-2">
            <p>
              <span className="font-semibold">📍 Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">📅 Date & Time:</span> {dateTime}
            </p>

            <p>
              <span className="font-semibold">👨‍⚕️ Healthcare Professional:</span>{" "}
              {doctor}
            </p>
          </div>

          <div>
            <p className="text-neutral-600 mt-4">{description}</p>
          </div>

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Organizer: {organizer?.name}</div>

            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
              src={organizer?.image}
            />
          </div>
          <hr className="my-6" />

          <div>
            <p>
              <span className="font-semibold">👥 Participants Registered:</span>{" "}
              {participantCount}
            </p>
          </div>

          <hr className="my-6" />
          <div >
            <p>
              <span className="font-semibold">💰 Camp Fee:</span> {fees}
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
