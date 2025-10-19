import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Star } from "lucide-react";

const FeedbackAndRatings = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data } = await axiosSecure.get("/feedback");
      setFeedbacks(data);
    };
    fetchFeedbacks();
  }, [axiosSecure]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          What Participants Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {fb.participantName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{fb.campName}</p>

              {/* Rating Stars */}
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`${
                      fb.rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 italic">"{fb.feedback}"</p>
              <span className="text-xs text-gray-400 mt-2 block">
                {new Date(fb.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackAndRatings;
