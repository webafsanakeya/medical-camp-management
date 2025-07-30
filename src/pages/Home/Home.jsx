import React from 'react';



import Banner from './Banner/Banner';
import CampServices from './Services/CampServices';

import Camps from '@/components/Home/Camps';
import PopularMedicalCamps from './PopularCampSection/PopularMedicalCamps';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularMedicalCamps></PopularMedicalCamps>
            <Camps></Camps>
            <CampServices></CampServices>

        </div>
    );
};

export default Home;