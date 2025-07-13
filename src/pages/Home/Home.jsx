import React from 'react';



import Banner from './Banner/Banner';
import CampServices from './Services/CampServices';

import Camps from '@/components/Home/Camps';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Camps></Camps>
            <CampServices></CampServices>

        </div>
    );
};

export default Home;