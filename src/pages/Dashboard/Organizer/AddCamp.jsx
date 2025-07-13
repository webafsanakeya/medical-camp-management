import { imageUpload } from "@/api/utils";
import AddCampForm from "@/components/Form/AddCampForm";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

import React, { useState } from "react";
import toast from "react-hot-toast";

const AddCamp = () => {
  const { user } = useAuth();

  const [isUploading, setIsUploading] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);

  const [imageUploadError, setImageUploadError] = useState(false)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const form = e.target;
    const campName = form?.campName?.value;
    const dateTime = form?.dateTime?.value;
    const location = form?.location?.value;
    const doctor = form?.doctor?.value;
    const participantCount = form?.participantCount?.value;
    

    try {
     
     

      const campData = {
        campName,
        dateTime,
        location,
        doctor,
        participantCount,
        image: uploadedImage,
        organizer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-camp`,
        campData
      );
      toast.success("Camp Data Added Successfully");
      form.reset();
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (e) =>{
    e.preventDefault()
    const image = e.target.files[0]
    console.log(image);
     try{
      // image URL response from imgbb
      const imageUrl = await imageUpload(image);
      console.log(imageUrl);
       setUploadedImage(imageUrl)
     }catch(err){
      setImageUploadError('Image Upload Failed')
      console.log(err);
     }
  }
  return (
    <div>
      <AddCampForm
        handleFormSubmit={handleFormSubmit}
        isUploading={isUploading}
        uploadedImage={uploadedImage}
        handleImageUpload={handleImageUpload}
        imageUploadError={imageUploadError}
      />
    </div>
  );
};

export default AddCamp;
