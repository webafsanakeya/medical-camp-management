import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/ui/Shared/Navbar/Navbar';
import Footer from '../components/ui/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='bg-white'>
            <Navbar></Navbar>
            <div className='pt-24 min-h-[calc(100vh-68px)]'>
<Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;