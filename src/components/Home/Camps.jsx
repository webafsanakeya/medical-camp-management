import React from 'react';


import MedicalCampCard from './MedicalCampCard';

const Camps = () => {
    return (
       
            <div className='pt-12 grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
                <MedicalCampCard></MedicalCampCard>
                <MedicalCampCard></MedicalCampCard>
                <MedicalCampCard></MedicalCampCard>
                <MedicalCampCard></MedicalCampCard>
                <MedicalCampCard></MedicalCampCard>
                <MedicalCampCard></MedicalCampCard>
                <MedicalCampCard></MedicalCampCard>
            </div>
        
    );
};

export default Camps;