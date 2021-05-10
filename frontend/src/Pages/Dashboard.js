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
          <div class="w-max mt-10">
            <div class="container mx-auto px-6 flex items-start justify-center ">
              <Link to="/profile">
                <div class="w-full">
                  <div class="flex flex-col lg:flex-row mx-auto bg-gradient-to-br from-blue-500 to-blue-900  shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                    <div class=" px-12 flex flex-col items-center py-10">
                      <div class=" mb-3 p-2 rounded-full bg-gray-200 flex items-center justify-center">
                        <img
                          class="w-24 h-24 overflow-hidden object-cover rounded-full"
                          src="/assets/img/person.svg"
                          alt="profile pic"
                          draggable="false"
                        />
                      </div>
                      <h2 class="text-gray-100  text-xl tracking-normal font-bold mb-1">
                        {userInfo.name ? userInfo.name : ""}
                      </h2>

                      <p class="text-gray-200 text-sm tracking-normal font-normal mb-1 text-center ">
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
