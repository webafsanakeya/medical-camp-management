import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation, useNavigate } from "react-router";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineUsers, HiOutlineCurrencyDollar, HiOutlineInformationCircle, HiOutlineClipboardList, HiOutlineClock, HiOutlineDocumentText, HiOutlineExclamationCircle } from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import CampsJoinModal from "@/components/Modal/CampsJoinModal";
import { AuthContext } from "@/providers/AuthProvider";

const CampDetails = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // --- Fetch Camp Details ---
  const { data: camp, isLoading: campLoading, isError: campError } = useQuery({
    queryKey: ["campDetails", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axiosSecure.get(`/available-camps/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // --- Fetch User Role ---
  const { data: userRole } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // --- Fetch Join Status ---
  const { data: hasJoinedQueryData = false } = useQuery({
    queryKey: ["joinStatus", user?.email, id],
    queryFn: async () => {
      if (!user?.email || !id) return false;
      const res = await axiosSecure.get(`/check-join-status?email=${user.email}&campId=${id}`);
      return res.data.joined;
    },
    enabled: !!user?.email && !!id && !!camp,
    initialData: false
  });

  const isLoading = authLoading || campLoading || (!!user && (userRole === undefined || hasJoinedQueryData === undefined));
  const isError = campError || !camp?._id;

  // --- Loading Spinner ---
  if (isLoading)
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-20">
        <CgSpinner className="h-16 w-16 animate-spin text-teal-700" />
      </div>
    );

  // --- Error Message ---
  if (isError)
    return (
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center py-20 text-center px-4">
        <HiOutlineExclamationCircle className="h-20 w-20 text-red-400 mb-4" />
        <p className="text-2xl font-semibold text-red-600 mb-2">Could Not Load Camp Details</p>
        <p className="text-gray-600 max-w-md">
          We couldn't fetch the details for this camp. It might not exist, or there might have been a network issue.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    );

  // --- User State Checks ---
  const isOrganizer = userRole?.role === "organizer";
  const hasJoined = hasJoinedQueryData === true;
  const isDisabled = hasJoined || isOrganizer || !user;

  let buttonText = "Join Camp";
  let buttonClasses = "bg-teal-700 hover:bg-teal-800 focus:ring-teal-500";
  if (!user) {
    buttonText = "Login to Join";
    buttonClasses = "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  } else if (hasJoined) {
    buttonText = "Already Joined";
    buttonClasses = "bg-gray-400 cursor-not-allowed";
  } else if (isOrganizer) {
    buttonText = "Organizer View (Cannot Join)";
    buttonClasses = "bg-red-500 cursor-not-allowed";
  }

  const handleJoinClick = () => {
    if (!user) {
      navigate("/sign-in", { state: { from: location } });
    } else if (!isDisabled) {
      setIsModalOpen(true);
    }
  };

  // Tabs definition
  const tabs = [
    { id: "overview", label: "Overview", icon: HiOutlineInformationCircle },
    { id: "services", label: "Services", icon: HiOutlineClipboardList },
    { id: "schedule", label: "Schedule", icon: HiOutlineClock },
    { id: "requirements", label: "Requirements", icon: HiOutlineDocumentText }
  ];

  const tabContentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } }
  };

  return (
    <div className="bg-gray-50 py-16 sm:py-20">
      <Helmet>
        <title>{camp.campName} | MediCamp</title>
        <meta
          name="description"
          content={`Details for the ${camp.campName} medical camp including date, location, services, and how to join.`}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Camp Card */}
        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {camp.image && <img src={camp.image} alt={camp.campName} className="w-full h-64 md:h-80 object-cover" />}

          <div className="p-6 md:p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">{camp.campName}</h1>
            {/* ... (camp info like date, location, fees, doctor) */}
          </div>

          {/* Tabs & Tab Content */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-1 px-4 sm:px-6 lg:px-8 -mb-px overflow-x-auto" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-2 whitespace-nowrap py-3 px-4 rounded-t-md font-medium text-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 cursor-pointer ${
                    activeTab === tab.id ? "bg-white text-teal-700 shadow-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-selected={activeTab === tab.id}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-teal-600" : "text-gray-400 group-hover:text-gray-500"}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 md:p-8 min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} variants={tabContentVariants} initial="initial" animate="animate" exit="exit">
                {/* Render tab content here (overview, services, schedule, requirements) */}
                {activeTab === "overview" && <p>{camp.description || "No description available."}</p>}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Join Button */}
          <div className="p-6 md:p-8 border-t border-gray-200 text-center">
            <button
              onClick={handleJoinClick}
              disabled={isDisabled && user}
              className={`inline-flex items-center justify-center rounded-lg border border-transparent px-8 py-3 text-base font-medium text-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClasses} ${
                isDisabled && user ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {buttonText}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {camp?._id && user && (
        <CampsJoinModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          camp={camp}
          user={user}
          onJoined={() => {
            setIsModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["joinStatus", user?.email, id] });
            queryClient.invalidateQueries({ queryKey: ["campDetails", id] });
          }}
        />
      )}
    </div>
  );
};

export default CampDetails;
