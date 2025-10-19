import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

const phrases = [
  "Bringing healthcare to those in need",
  "Impacting lives, one camp at a time",
  "Caring, healing, and giving back",
  "Together for a healthier community",
];

const Banner = () => {
  const [popularCamps, setPopularCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCamps = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "http://localhost:5173";
        const res = await fetch(`${base}/camps/popular`);
        const data = await res.json();
        setPopularCamps(data);
      } catch (error) {
        console.error("Error fetching popular camps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularCamps();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[300px] md:h-[550px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading popular camps...
        </p>
      </div>
    );
  }

  if (!popularCamps.length) {
    return (
      <div className="w-full h-[300px] md:h-[550px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">No popular camps available</p>
      </div>
    );
  }

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={5000}
      transitionTime={1200}
      stopOnHover
      swipeable
      emulateTouch
      showIndicators={true}
    >
      {popularCamps.map((camp, index) => (
        <div
          key={camp._id}
          className="relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-full overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={camp.image}
            alt={camp.title}
            className="object-cover w-full h-full brightness-75 transition-transform duration-700 hover:scale-105"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

          {/* Metrics Badges */}
          <div className="absolute top-6 left-6 flex gap-3 flex-wrap">
            <div
              className="bg-lime-500/90 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md"
              style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `0.2s` }}
            >
              👥 {camp.participantCount || 0} Participants
            </div>
            {camp.beneficiaries && (
              <div
                className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md"
                style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `0.4s` }}
              >
                ❤️ {camp.beneficiaries} Beneficiaries
              </div>
            )}
          </div>

          {/* Text Content */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center px-4"
            style={{ animation: `fadeInUp 0.8s ease forwards`, animationDelay: `0.6s` }}
          >
            <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-extrabold drop-shadow-md">
              {camp.title}
            </h2>
            <p className="mt-2 text-sm md:text-lg text-gray-200 drop-shadow-sm">
              {phrases[index % phrases.length]}
            </p>
            <Link to="/available-camps">
              <button className="mt-4 bg-lime-500 hover:bg-lime-600 text-black font-semibold px-6 py-2 rounded-full shadow-lg transition duration-300">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
