import useAuth from "@/hooks/useAuth";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "../Form/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const JoinCampModal = ({ closeModal, isOpen, camp }) => {
  // Total joiner Calculation
  const { user } = useAuth();
  const {
    _id,
    campName,
    dateTime,
    location,
    doctor,
    participantCount,
    fees,
    organizer,

    image,
  } = camp || {};

  const [selectedParticipant, setSelectedParticipant] = useState(1);
  const [totalFees, setTotalFees] = useState(fees);
  const [registeredData, setRegisteredData] = useState({
    participant: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    organizer,
    campId: _id,
    participantCount: 1,
    fees: fees,
    campName: campName,
    campParticipantCount: participantCount,
    campImage: image,
  });

  useEffect(() => {
    if (user)
      setRegisteredData((prev) => {
        return {
          ...prev,
          participant: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        };
      });
  }, [user]);

  const handleParticipant = (value) => {
    const totalParticipant = parseInt(value);
    if (totalParticipant > participantCount)
      return toast.error("You can not join camp");
    const calculatedFees = totalParticipant * fees;

    setSelectedParticipant(totalParticipant);
    setTotalFees(calculatedFees);

    setRegisteredData((prev) => {
      return {
        ...prev,
        fees: calculatedFees,
        participantCount: totalParticipant,
      };
    });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Join Camp
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Camp Name: {campName}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Healthcare Professional: {doctor}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Location: {location}</p>
              <p className="text-sm text-gray-500">Date & Time: {dateTime}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Participant : {user?.displayName}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Fees Per Participants: {fees}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Participants Registered:: {participantCount}
              </p>
            </div>
            <hr className="mt-2" />
            <p>Registration Info: </p>
            <div className="mt-2">
              <input
                value={selectedParticipant}
                onChange={(e) => handleParticipant(e.target.value)}
                type="number"
                min={1}
                className="border px-3 py-1"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Selected Participants Registered : {selectedParticipant}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Total Fees: {totalFees}</p>
            </div>

            {/* stripe checkout form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm totalFees={totalFees} closeModal={closeModal} registeredData={registeredData} />
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default JoinCampModal;
