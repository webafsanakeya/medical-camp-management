const AddCampForm = ({
  handleFormSubmit,
  isUploading,
  uploadedImage,
  handleImageUpload,
  imageUploadError,
}) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* A. Camp Name */}
          <div className="space-y-1">
            <label htmlFor="campName" className="text-gray-700 font-medium">
              Camp Name
            </label>
            <input
              id="campName"
              name="campName"
              type="text"
              required
              placeholder="Enter camp name"
              className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
            />
          </div>

          {/* B. Date & Time */}
          <div className="space-y-1">
            <label htmlFor="dateTime" className="text-gray-700 font-medium">
              Date & Time
            </label>
            <input
              id="dateTime"
              name="dateTime"
              type="datetime-local"
              required
              className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
            />
          </div>

          {/* C. Location */}
          <div className="space-y-1">
            <label htmlFor="location" className="text-gray-700 font-medium">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              placeholder="Enter location"
              className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
            />
          </div>

          {/* D. Healthcare Professional */}
          <div className="space-y-1">
            <label htmlFor="doctor" className="text-gray-700 font-medium">
              Healthcare Professional Name
            </label>
            <input
              id="doctor"
              name="doctor"
              type="text"
              required
              placeholder="Dr. Ayesha Rahman"
              className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
            />
          </div>

          {/* E. Participant Count */}
          <div className="space-y-1">
            <label
              htmlFor="participantCount"
              className="text-gray-700 font-medium"
            >
              Participant Count
            </label>
            <input
              id="participantCount"
              name="participantCount"
              type="number"
              required
              placeholder="Available Participant"
              className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
            />
          </div>

          {/* F. Camp Fees */}
          <div className="space-y-1">
            <label htmlFor="fees" className="text-gray-700 font-medium">
              Camp Fees ($)
            </label>
            <input
              id="fees"
              name="fees"
              type="number"
              required
              placeholder="e.g. 20"
              className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
            />
          </div>

          {/* F. Image Upload */}
          <div className="space-y-1">
            <label htmlFor="image" className="text-gray-700 font-medium">
              Camp Image
            </label>
            <input
              onChange={handleImageUpload}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              className="w-full px-4 py-2 border border-lime-300 rounded-md bg-white"
            />
            {uploadedImage && (
              <div className="mt-2">
                <img
                  src={uploadedImage}
                  alt="Uploaded preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-300 shadow-sm"
                />
              </div>
            )}
            {imageUploadError && <p>{imageUploadError}</p>}
          </div>

          {/* G. Description (spans 2 columns) */}
          <div className="col-span-1 md:col-span-2 space-y-1">
            <label htmlFor="description" className="text-gray-700 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              placeholder="Write a brief description of the medical camp..."
              className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-3 rounded-md hover:bg-lime-600 transition font-semibold"
          >
            {isUploading ? "saving" : "save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCampForm;
