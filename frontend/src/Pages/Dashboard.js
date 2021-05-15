import { useContext } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

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
          <div className="w-max mt-10">
            <div className="container mx-auto px-6 flex items-start justify-center ">
              <Link to="/profile">
                <div className="w-full">
                  <div className="flex flex-col lg:flex-row mx-auto bg-gradient-to-br from-blue-500 to-blue-900  shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                    <div className=" px-12 flex flex-col items-center py-10">
                      <div className="w-24 h-24 mb-3 p-2 fill-current text-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-full h-full fill-current text-white dark:text-blueGray-800 rounded-full"
                          focusable="false"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                        </svg>
                      </div>
                      <h2 className="text-gray-100  text-xl tracking-normal font-bold mb-1">
                        {userInfo.name ? userInfo.name : ""}
                      </h2>

                      <p className="text-gray-200 text-sm tracking-normal font-normal mb-1 text-center ">
                        {userInfo.email ? userInfo.email : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
