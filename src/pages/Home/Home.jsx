import React from 'react';



import Banner from './Banner/Banner';
import CampServices from './Services/CampServices';

import Camps from '@/components/Home/Camps';
import PopularMedicalCamps from './PopularCampSection/PopularMedicalCamps';
import PublicFeedbacks from '@/components/Feedback/PublicFeedbacks';
import PopularDoctors from '@/components/PopularDoctors/PopularDoctors';
import UpcomingEvents from '@/components/UpcomingEvents/UpcomingEvents';
import HealthTips from '@/components/HealthTips/HealthTips';




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularMedicalCamps></PopularMedicalCamps>
            <Camps></Camps>
            <CampServices></CampServices>
            <PublicFeedbacks />
            <PopularDoctors />
            <UpcomingEvents />
           <HealthTips />

        </div>
    );
};

export default Home;