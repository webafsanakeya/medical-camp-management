import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineSearch,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import dayjs from "dayjs";

const ITEMS_PER_PAGE = 6;

// Camp Card
const CampCardDisplay = ({ camp }) => (
  <motion.article
    layout
    className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <div className="relative h-56 w-full">
      <img
        src={camp.image}
        alt={`Banner for ${camp.campName} at ${camp.location}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 text-white py-1 px-3 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-md">
        <HiOutlineUsers className="w-4 h-4" />
        <span>{camp.participants || 0} Participants</span>
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{camp.campName}</h3>
        <div className="space-y-2 text-gray-600 text-sm">
          <p className="flex items-center gap-2">
            <HiOutlineLocationMarker className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <span>{camp.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <HiOutlineCalendar className="w-5 h-5 text-cyan-600 flex-shrink-0" />
            <span>{dayjs(camp.dateTime).format("DD MMM YYYY")}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-teal-600 font-semibold w-5 h-5 flex justify-center items-center flex-shrink-0">
              $
            </span>
            <span>{camp.fees}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-cyan-600 text-lg">👨‍⚕️</span>
            <span>{camp.doctorName}</span>
          </p>
        </div>
      </div>

      <div className="mt-5">
        <RouterLink
          to={`/camp-details/${camp._id}`}
          className="inline-block px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 hover:scale-105 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          View Details
        </RouterLink>
      </div>
    </div>
  </motion.article>
);

// Pagination
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-teal-500 via-cyan-500 to-cyan-600 text-white hover:scale-105 shadow-md"
        }`}
      >
        <HiChevronLeft className="h-5 w-5" />
        Previous
      </button>

      <span className="text-gray-700 font-medium text-sm">
        Page <span className="text-teal-600 font-semibold">{currentPage}</span> of{" "}
        <span className="text-cyan-600 font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-teal-500 via-cyan-500 to-cyan-600 text-white hover:scale-105 shadow-md"
        }`}
      >
        Next
        <HiChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};

// Main Component
const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [layoutColumns, setLayoutColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: camps = [], isLoading, isError } = useQuery({
    queryKey: ["available-camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/available-camps");
      return res.data;
    },
  });

  const filteredAndSortedCamps = camps
    .filter((camp) => {
      const formattedDate = dayjs(camp.dateTime).format("DD MMM YYYY").toLowerCase();
      return (
        camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formattedDate.includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "mostRegistered") return (b.participants || 0) - (a.participants || 0);
      if (sortBy === "campFees") return a.fees - b.fees;
      if (sortBy === "alphabetical") return a.campName.localeCompare(b.campName);
      return 0;
    });

  const totalItems = filteredAndSortedCamps.length;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCamps = filteredAndSortedCamps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredAndSortedCamps.length / ITEMS_PER_PAGE) || 1;
    if (currentPage > newTotalPages || currentPage === 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, sortBy, camps]);

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <CgSpinner className="h-12 w-12 animate-spin text-teal-600" />
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <p className="text-lg text-red-600">Failed to load camps.</p>
      </div>
    );

  return (
    <main className="bg-gray-50 py-16 sm:py-20 min-h-screen">
      <Helmet>
        <title>Available Camps | MediCamp</title>
        <meta name="description" content="Browse and search for upcoming medical camps." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Available Medical Camps
          </h1>
        </header>

        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
          {/* Search */}
          <div className="relative md:col-span-12 lg:col-span-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-teal-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name, location, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-gray-300 bg-white py-3 pl-10 pr-3 shadow-sm focus:border-teal-500 focus:ring-1 focus:ring-cyan-500 sm:text-sm"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-6 lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full rounded-lg border-gray-300 bg-white py-3 pl-3 pr-8 shadow-sm focus:border-cyan-500 focus:ring-1 focus:ring-teal-500 sm:text-sm text-gray-700"
            >
              <option value="default">Sort By</option>
              <option value="mostRegistered">Most Registered</option>
              <option value="campFees">Camp Fees (Low to High)</option>
              <option value="alphabetical">Alphabetical Order</option>
            </select>
          </div>

          {/* Layout Buttons */}
          <div className="flex justify-start md:justify-end space-x-2 md:col-span-6 lg:col-span-3">
            <button
              onClick={() => setLayoutColumns(2)}
              className={`flex items-center justify-center rounded-lg p-2 transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
                layoutColumns === 2
                  ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-cyan-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-500 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 border-gray-300"
              }`}
            >
              <HiOutlineViewList
                className={`h-6 w-6 ${
                  layoutColumns === 2 ? "text-white" : "text-gray-500"
                }`}
              />
            </button>
            <button
              onClick={() => setLayoutColumns(3)}
              className={`flex items-center justify-center rounded-lg p-2 transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
                layoutColumns === 3
                  ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-cyan-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-500 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 border-gray-300"
              }`}
            >
              <HiOutlineViewGrid
                className={`h-6 w-6 ${
                  layoutColumns === 3 ? "text-white" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Camps Grid */}
        <AnimatePresence>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`grid gap-8 ${
              layoutColumns === 3
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {paginatedCamps.length > 0 ? (
              paginatedCamps.map((camp) => (
                <CampCardDisplay key={camp._id} camp={camp} />
              ))
            ) : (
              <p className="text-gray-500 md:col-span-2 lg:col-span-3 text-center py-10">
                No camps found matching your search criteria.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {filteredAndSortedCamps.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
};

export default AvailableCamps;
