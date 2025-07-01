import React from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";

function DashboardLayout({ children }) {
    return (
        <div>
            <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64 ">
                <SideNav />
            </div>
            <div>
                <div className="sticky z-20 top-0 start-0 bg-white">
                    <Header />
                </div>
                <div className="md:ml-64 p-10">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;