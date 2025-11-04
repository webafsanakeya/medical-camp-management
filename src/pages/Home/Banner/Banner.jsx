import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

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
        const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${base}/camps/popular`);
        if (!res.ok) throw new Error("Failed to fetch popular camps");
        const data = await res.json();
        setPopularCamps(data.slice(0, 3)); // Only first 3 camps
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
      <div className="w-screen h-[300px] md:h-[550px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading popular camps...
        </p>
      </div>
    );
  }

  if (!popularCamps.length) {
    return (
      <div className="w-screen h-[300px] md:h-[550px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">No popular camps available</p>
      </div>
    );
  }

  return (
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}          // Auto-slide every 5 seconds
        transitionTime={1200}    // Smooth transition
        stopOnHover={true}       // Pause when hovered
        swipeable
        emulateTouch
        showIndicators={true}
      >
        {popularCamps.map((camp, index) => (
          <div
            key={camp._id}
            className="relative w-full h-[80vh] sm:h-[70vh] lg:h-[90vh] overflow-hidden"
          >
            {/* Background Image */}
            <img
              src={camp.image || "/placeholder.jpg"}
              alt={camp.title}
              className="object-cover w-full h-full brightness-110 shadow-lg transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-xl mb-4">
                {camp.title}
              </h2>

              <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-md">
                <Typewriter
                  words={[phrases[index % phrases.length]]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </p>

              <Link to="/available-camps">
                <button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 transform hover:-translate-y-1 hover:scale-105">
                  View Details
                </button>
              </Link>
            </div>

            {/* Top Metrics */}
            <div className="absolute top-6 left-6 flex gap-3 flex-wrap animate-fadeIn">
              <div className="bg-lime-500/90 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                👥 {camp.participantCount || 0} Participants
              </div>
              {camp.beneficiaries && (
                <div className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  ❤️ {camp.beneficiaries} Beneficiaries
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
