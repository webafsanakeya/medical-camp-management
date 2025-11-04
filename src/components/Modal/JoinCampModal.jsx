import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "../Form/CheckoutForm";
import useAuth from "@/hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const JoinCampModal = ({ isOpen, closeModal, camp, refetchCamp }) => {
  const { user } = useAuth();
  const { _id, campName, dateTime, location, doctor, participantCount, fees, organizer, image } = camp || {};

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
    campName,
    campParticipantCount: participantCount,
    campImage: image,
  });

  useEffect(() => {
    if (user) {
      setRegisteredData(prev => ({
        ...prev,
        participant: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
      }));
    }
  }, [user]);

  const handleParticipantChange = (value) => {
    const count = parseInt(value);
    if (count + participantCount > 1000) return toast.error("Cannot exceed max capacity");
    setSelectedParticipant(count);
    setTotalFees(count * fees);

    setRegisteredData(prev => ({
      ...prev,
      participantCount: count,
      fees: count * fees,
    }));
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl">
            <DialogTitle className="text-lg font-medium text-center text-gray-900">Join Camp</DialogTitle>

            <div className="mt-4 space-y-2">
              <p>Camp Name: {campName}</p>
              <p>Healthcare Professional: {doctor}</p>
              <p>Location: {location}</p>
              <p>Date & Time: {dateTime}</p>
              <p>Participant Name: {user?.displayName}</p>
              <p>Participant Email: {user?.email}</p>
              <p>Fees per Participant: {fees}</p>
              <p>Registered Participants: {participantCount}</p>
            </div>

            <hr className="my-4" />
            <div>
              <label className="block mb-1">Number of Participants</label>
              <input
                type="number"
                min={1}
                value={selectedParticipant}
                onChange={(e) => handleParticipantChange(e.target.value)}
                className="border px-3 py-1 w-full rounded"
              />
            </div>

            <p className="mt-2">Total Fees: {totalFees}$</p>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                registeredData={registeredData}
                totalFees={totalFees}
                closeModal={() => {
                  closeModal();
                  refetchCamp(); // refetch updated participant count
                }}
              />
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default JoinCampModal;
