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
                <div className='relative h-[500px] md:h-[650px] w-full overflow-hidden'>
                    <img src={bannerImg1} className="object-cover w-full h-full" />
                    <p className="legend">Bringing Healthcare to Every Doorstep</p>
                </div>
                <div className='relative h-[500px] md:h-[650px] w-full overflow-hidden'>
                    <img src={bannerImg2} className="object-cover w-full h-full" />
                    <p className="legend">Organized, Accessible, and Compassionate Care</p>
                </div>
                <div className='relative h-[500px] md:h-[650px] w-full overflow-hidden'>
                    <img src={bannerImg3} className="object-cover w-full h-full" />
                    <p className="legend">Reaching the Unreached - One Camp at a Time</p>
                </div>
            </Carousel>
    );
};

export default Banner;