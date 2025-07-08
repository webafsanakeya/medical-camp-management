import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/ui/Shared/Navbar/Navbar';
import Footer from '../components/ui/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;