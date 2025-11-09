import AboutUs from '@/components/AboutUs/AboutUs';
import Accordian from '@/components/Accordian/Accordian';
import CampCard from '@/components/CampCard/CampCard';
import ContactSection from '@/components/Contact/ContactSection';
import CTASection from '@/components/CTA/CTASection';
import Feedback from '@/components/Feedback/Feedback';
import HealthTips from '@/components/HealthTips/HealthTips';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import OurServices from '@/components/OurService/OurServices';
import Slider from '@/components/Slider/Slider';

import React from 'react';


const Home = () => {
    return (
        <div>
           
                <title>Home | Medical Camp </title>
                <meta
                    name="description"
                    content="Welcome to your dashboard. Browse camps, feedback, and more."
                />
           
            <Slider />
            <OurServices />
             <HowItWorks />
            <CampCard />
            <Feedback />
             <HealthTips />
            <AboutUs />
            <CTASection />
            <Accordian />
            <ContactSection />
        </div>
    );
};

export default Home;