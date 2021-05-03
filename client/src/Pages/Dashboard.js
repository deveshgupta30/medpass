import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | MedPass</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="container mx-auto">
          <div className="flex items-center mt-3 max-w-lg rounded overflow-hidden">
            <div className="pl-6 pr-1 py-4">
              <p className="font-semibold text-3xl mb-2">
                Hello<span></span>!
              </p>
            </div>
            <img height="28px" width="28px" alt="Wave Hand" src="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
