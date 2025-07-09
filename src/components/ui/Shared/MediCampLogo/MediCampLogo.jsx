import React from 'react';
import logo from '../../../../assets/logo/logo.png'
import { Link } from 'react-router';

const MediCampLogo = () => {
    return (
        <Link to='/'>
        <div>
            <img src={logo} alt="" />
           
        </div>
        </Link>
    );
};

export default MediCampLogo;