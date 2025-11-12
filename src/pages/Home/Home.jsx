import AboutUs from '@/components/AboutUs/AboutUs';
import Accordion from '@/components/Accordion/Accordion';

import CampCard from '@/components/CampCard/CampCard';
import ContactSection from '@/components/Contact/ContactSection';
import CTASection from '@/components/CTA/CTASection';
import Feedback from '@/components/Feedback/Feedback';
import HealthTips from '@/components/HealthTips/HealthTips';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import OurServices from '@/components/OurService/OurServices';
import Slider from '@/components/Slider/Slider';

import React from 'react';
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div>
           
            <Helmet>
    <title>MediCamp | Health Camps & Volunteering</title>
    <meta name="description" content="Join MediCamp medical camps to get healthcare support and volunteer opportunities in your community." />
</Helmet>
           
            <Slider />
            <OurServices />
             <HowItWorks />
            <CampCard />
            <Feedback />
             <HealthTips />
            <AboutUs />
            <CTASection />
            <Accordion />
            <ContactSection />
        </div>
    );
};

export default Home;