import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import MedicalCampCard from "./MedicalCampCard";
import EmptyState from "../ui/Shared/EmptyState";

const AvailableCamps = () => {
  const camps = useLoaderData() || [];
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("most-registered");

  const filteredCamps = useMemo(() => {
    const q = query.toLowerCase();
    const filtered = camps.filter((camp) => {
      const haystack = `${camp.campName} ${camp.location} ${camp.doctor} ${camp.description}`.toLowerCase();
      return haystack.includes(q);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "most-registered") return b.participantCount - a.participantCount;
      if (sortBy === "fees-asc") return (a.fees || 0) - (b.fees || 0);
      if (sortBy === "fees-desc") return (b.fees || 0) - (a.fees || 0);
      if (sortBy === "alpha") return a.campName.localeCompare(b.campName);
      return 0;
    });
  }, [camps, query, sortBy]);

  return (
    <section className="w-full bg-gray-100 py-12">
      {/* Full width content wrapper with same px as PopularMedicalCamps */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900">Available Medical Camps</h2>
          <p className="mt-2 text-sm text-gray-600">Browse and join upcoming medical camps</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 max-w-7xl mx-auto">
          <input
            type="text"
            placeholder="Search by name, location or doctor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-lime-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="most-registered">Most Registered</option>
            <option value="fees-asc">Camp Fees - Low to High</option>
            <option value="fees-desc">Camp Fees - High to Low</option>
            <option value="alpha">Camp Name - A to Z</option>
          </select>
        </div>

        {/* Camps Grid */}
        {filteredCamps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredCamps.map((camp) => (
              <MedicalCampCard key={camp._id} camp={camp} />
            ))}
          </div>
        ) : (
          <EmptyState message="No camps match your search" />
        )}
      </div>
    </section>
  );
};

export default AvailableCamps;
