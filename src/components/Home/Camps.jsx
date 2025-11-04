import React from "react";
import MedicalCampCard from "./MedicalCampCard";
import { useLoaderData } from "react-router";
import EmptyState from "../ui/Shared/EmptyState";

const Camps = () => {
  const camps = useLoaderData();

  return (
    <section className="w-full bg-gray-100 py-16 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">All Medical Camps</h2>
          <p className="mt-2 text-sm text-gray-600">
            Discover all available medical camps and upcoming opportunities
          </p>
        </div>

        {/* Camps Grid */}
        {camps && camps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {camps.map((camp) => (
              <MedicalCampCard key={camp._id} camp={camp} />
            ))}
          </div>
        ) : (
          <EmptyState message="No camp data available right now" />
        )}
      </div>
    </section>
  );
};

export default Camps;
