import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/ui/Shared/Navbar/Navbar';
import Footer from '../components/ui/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='bg-white w-full'>
            <Navbar />

            {/* Full width outlet */}
            <main className='pt-24 min-h-[calc(100vh-68px)] w-full'>
                <div className='w-full'>
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
