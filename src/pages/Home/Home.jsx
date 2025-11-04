import React from 'react';

import Banner from './Banner/Banner';
import CampServices from './Services/CampServices';

import PopularMedicalCamps from './PopularCampSection/PopularMedicalCamps';
import PublicFeedbacks from '@/components/Feedback/PublicFeedbacks';
import PopularDoctors from '@/components/PopularDoctors/PopularDoctors';
import UpcomingEvents from '@/components/UpcomingEvents/UpcomingEvents';
import HealthTips from '@/components/HealthTips/HealthTips';
import Container from '@/components/ui/Shared/Container';

const Home = () => {
  return (
    <div className="w-full">
      {/* Banner - full width */}
      <div className="w-full bg-gray-50">
        <Banner />
      </div>

      {/* Popular Medical Camps */}
      <div className="w-full bg-gray-100">
        <PopularMedicalCamps />
      </div>



      {/* Camp Services */}
      <div className="">
        <Container>
          <CampServices />
        </Container>
      </div>

      {/* Public Feedbacks */}
      <div className="">
        <Container>
          <PublicFeedbacks />
        </Container>
      </div>

      {/* Popular Doctors */}
      <div className="">
        <Container>
          <PopularDoctors />
        </Container>
      </div>

      {/* Upcoming Events */}
      <div className="">
        <Container>
          <UpcomingEvents />
        </Container>
      </div>

      {/* Health Tips */}
      <div className="">
        <Container>
          <HealthTips />
        </Container>
      </div>
    </div>
  );
};

export default Home;
