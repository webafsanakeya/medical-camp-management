import React from 'react';
import logo from '../../../../assets/logo/logo.png';
import { Link } from 'react-router';

const MediCampLogo = ({ invert = false }) => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <img
        src={logo}
        alt="MediCamp Logo"
        className={`w-8 h-8 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-105 ${
          invert ? 'brightness-0 invert' : ''
        }`}
      />
      <span
        className={`text-lg sm:text-xl md:text-2xl font-extrabold transition-colors duration-300 group-hover:text-lime-800 ${
          invert ? 'text-white' : 'text-lime-700'
        }`}
      >
        MediCamp
      </span>
    </Link>
  );
};

export default MediCampLogo;
