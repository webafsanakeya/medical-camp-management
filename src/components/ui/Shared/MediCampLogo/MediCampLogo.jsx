import React from 'react';
import logo from '../../../../assets/logo/logo.png'
import { Link } from 'react-router';

const MediCampLogo = () => {
    return (
        <Link to='/'>
        <div className='flex items-center'>
            <img src={logo} width='100' height='100' alt="" />
            <p className='text-xl font-bold -ml-4'>MediCamp</p>
           
        </div>
        </Link>
    );
};

export default MediCampLogo;