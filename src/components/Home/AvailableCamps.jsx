import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import Container from "../ui/Shared/Container";
import MedicalCampCard from "./MedicalCampCard";
import EmptyState from "../ui/Shared/EmptyState";


const AvailableCamps = () => {
  const camps = useLoaderData() || [];

  // States for filters
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("most-registered");
  const [twoCols, setTwoCols] = useState(false);

  // Filter + sort camps
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
    <Container>
      {/* Controls */}
      <div className="pt-8 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, location or doctor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-lime-500"
        />

        {/* Sort */}
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

        {/* Layout toggle */}
        <button
          onClick={() => setTwoCols((prev) => !prev)}
          className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          {twoCols ? "3-column layout" : "2-column layout"}
        </button>
      </div>

      {/* Camps Grid */}
      {filteredCamps.length > 0 ? (
        <div
          className={`pt-6 grid gap-8 sm:grid-cols-1 ${
            twoCols ? "md:grid-cols-2" : "md:grid-cols-3"
          }`}
        >
          {filteredCamps.map((camp) => (
            <MedicalCampCard key={camp._id} camp={camp} />
          ))}
        </div>
      ) : (
        <EmptyState message="No camps match your search" />
      )}
    </Container>
  );
};

export default AvailableCamps;
