import React from "react";
import MedicalCampCard from "./MedicalCampCard";
import { useLoaderData } from "react-router"; 
import Container from "../ui/Shared/Container";
import EmptyState from "../ui/Shared/EmptyState";

const Camps = () => {
  const camps = useLoaderData();

  return (
    <Container>
      {camps && camps.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {camps.map((camp) => (
            <MedicalCampCard key={camp._id} camp={camp} />
          ))}
        </div>
      ) : (
        <EmptyState message="No camp data available right now" />
      )}
    </Container>
  );
};

export default Camps;
