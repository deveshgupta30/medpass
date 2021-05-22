import { Link } from "react-router-dom";
const RecordCardDashboard = () => {
  return (
    <div className=" container mx-auto">
      <div className="w-max mt-10">
        <div className="container mx-auto px-6 flex items-start justify-center ">
          <Link to="/records">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row mx-auto bg-gradient-to-br from-violet-400 to-violet-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                <div className=" px-12 flex flex-col items-center py-10">
                  <div className="w-24 h-24 mb-3 p-2 fill-current text-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full fill-current text-white dark:text-blueGray-800 rounded-full"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <h2 className="text-gray-100  text-xl tracking-normal font-bold mb-1">
                    Records
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

export default RecordCardDashboard;
