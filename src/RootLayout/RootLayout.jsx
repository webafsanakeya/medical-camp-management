// src/Layout/RootLayout.jsx
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300">
            <Navbar></Navbar>
            <main className="min-h-[calc(100vh-136px)] ">
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;