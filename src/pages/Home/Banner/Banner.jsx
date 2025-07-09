import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner/banner1.jpg';
import bannerImg2 from '../../../assets/banner/banner2.jpg';
import bannerImg3 from '../../../assets/banner/banner3.jpg';

const Banner = () => {
    return (
        <Carousel 
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={800}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true} >
                <div className='relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-full overflow-hidden'>
                    <img src={bannerImg1} className="object-cover w-full h-full" />
                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded text-sm sm:text-base md:text-lg font-medium shadow-lg">Bringing Healthcare to Every Doorstep</p>
                </div>
                <div className='relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-full overflow-hidden'>
                    <img src={bannerImg2} className="object-cover w-full h-full" />
                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded text-sm sm:text-base md:text-lg font-medium shadow-lg">Organized, Accessible, and Compassionate Care</p>
                </div>
                <div className='relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-full overflow-hidden'>
                    <img src={bannerImg3} className="object-cover w-full h-full" />
                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded text-sm sm:text-base md:text-lg font-medium shadow-lg">Reaching the Unreached - One Camp at a Time</p>
                </div>
            </Carousel>
    );
};

export default Banner;