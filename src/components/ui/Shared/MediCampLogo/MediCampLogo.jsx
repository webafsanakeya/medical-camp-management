import React from 'react';
import logo from '../../../../assets/logo/logo.png';
import { Link } from 'react-router'; 

const MediCampLogo = () => {
  return (
    <Link to='/' className='flex items-center gap-2'>
      <img src={logo} alt="MediCamp Logo" width={40} height={40} />
      <span className='text-xl font-bold text-lime-700'>MediCamp</span>
    </Link>
  );
};

export default MediCampLogo;
