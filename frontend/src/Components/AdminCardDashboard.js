import { Link } from "react-router-dom";
const AdminCardDashboard = () => {
  return (
    <div className=" container mx-auto">
      <div className="w-max mt-10">
        <div className="container mx-auto px-6 flex items-start justify-center ">
          <Link to="/admin">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row mx-auto bg-gradient-to-br from-violet-400 to-violet-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                <div className=" px-12 flex flex-col items-center py-10">
                  <div className="w-24 h-24 mb-3 p-2 fill-current text-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full fill-current text-white dark:text-blueGray-800 rounded-full"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-gray-100  text-xl tracking-normal font-bold mb-1">
                    Admin Portal
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminCardDashboard;
