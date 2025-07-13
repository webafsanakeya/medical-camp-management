import { imageUpload } from "@/api/utils";
import AddCampForm from "@/components/Form/AddCampForm";

import React from "react";

const AddCamp = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const campName = form?.campName?.value;
    const dateTime = form?.dateTime?.value;
    const location = form?.location?.value;
    const doctor = form?.doctor?.value;
    const participantCount = form?.participantCount?.value;
    const image = form?.image?.files[0];

    // image URL response from imgbb
    const imageUrl = await imageUpload(image);

    const campData = {
      campName,
      dateTime,
      location,
      doctor,
      participantCount,
      image: imageUrl,
    };
    console.table(campData);
  };
  return (
    <div>
      <AddCampForm handleFormSubmit={handleFormSubmit}></AddCampForm>
    </div>
  );
};

export default AddCamp;
