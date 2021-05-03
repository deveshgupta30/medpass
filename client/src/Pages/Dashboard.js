import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);

  const { userInfo } = authState;

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
                Hello <span>{userInfo.name ? userInfo.name : ""}</span>!
                <span className="text-2xl">👋</span>&nbsp;
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
