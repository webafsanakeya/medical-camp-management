import JoinCampModal from "@/components/Modal/JoinCampModal";
import Button from "@/components/ui/Shared/Button/Button";

import Container from "@/components/ui/Shared/Container";
import Heading from "@/components/ui/Shared/Heading";
import LoadingSpinner from "@/components/ui/Shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

const CampDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  const {
    data: camp,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/camp/${id}`
      );
      return data;
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  if (!camp || typeof camp !== "object") return <p>We are Sorry!</p>;

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
  if (isRoleLoading || isLoading) return <LoadingSpinner />;

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

          <div className="text-xl font-semibold flex flex-row items-center gap-2">
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

          <div>
            <p>
              <span className="font-semibold">💰 Camp Fee:</span> {fees}
            </p>
          </div>

          <hr className="my-6" />

          <div className="flex justify-between items-center">
            <p className="font-bold text-3xl text-gray-500">Fees: $10</p>
            <div className="">
              <Button
                disabled={
                  !user ||
                  user?.email === organizer?.email ||
                  role !== "participant"
                }
                onClick={() => setIsOpen(true)}
                label={user ? "Join Camp" : "Login to Join Camp"}
              />
            </div>
          </div>

          <hr className="my-6" />

          {/* Join Camp Modal */}
          <JoinCampModal
            camp={camp}
            isOpen={isOpen}
            closeModal={closeModal}
            fetchPlant={refetch}
          />
        </div>
      </div>
    </Container>
  );
};

export default CampDetails;
