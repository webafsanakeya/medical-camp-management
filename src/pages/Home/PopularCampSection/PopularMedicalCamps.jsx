// Replace your existing fetch URL from `/camps` to `/camps/popular` in the frontend
// This way, the frontend calls your backend route that returns sorted top 6 camps.

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import MedicalCampCard from '@/components/Home/MedicalCampCard';


const PopularMedicalCamps = () => {
  const [popularCamps, setPopularCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps/popular`); // updated route
        setPopularCamps(res.data);
      } catch (error) {
        console.error('Failed to fetch popular camps:', error);
      }
    };

    fetchCamps();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Popular Medical Camps</h2>
          <p className="mt-2 text-sm text-gray-600">Check out our top attended camps</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularCamps.map((camp) => (
            <MedicalCampCard key={camp._id} camp={camp} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/available-camps"
            className="inline-block px-6 py-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition"
          >
            See All Camps
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularMedicalCamps;
