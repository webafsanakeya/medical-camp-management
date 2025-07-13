import React from "react";

import MedicalCampCard from "./MedicalCampCard";
import { useLoaderData } from "react-router";
import Container from "../ui/Shared/Container";
import EmptyState from "../ui/Shared/EmptyState";

const Camps = () => {
  const camps = useLoaderData();

  return (
  <Container>
      {
        camps && camps.length > 0 ? <div className="pt-12 grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {camps.map((camp) => (
        <MedicalCampCard key={camp._id} camp={camp} />
      ))}
    </div> : <EmptyState message='No camp data available right now'/>
      }
  </Container>
  );
};

export default Camps;
