const FileCard = (flink) => {
  return (
    <div className=" container mx-auto">
      <div className="w-max mt-10">
        <div className="container mx-auto px-6 flex items-start justify-center ">
          <a href={flink.flink} rel="noreferrer" target="_blank">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row mx-auto bg-gradient-to-br from-gray-400 to-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                <div className=" px-12 flex flex-col items-center py-10">
                  <div className="w-24 h-24 mb-3 p-2 fill-current text-white rounded-full flex items-center justify-center">
                    {flink.flink.includes(".pdf") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full fill-current text-white dark:text-blueGray-800 rounded-full"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full fill-current text-white dark:text-blueGray-800 rounded-full"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <h2 className="text-gray-100  text-normal tracking-normal font-bold mb-1">
                    {flink.flink.includes(".pdf")
                      ? flink.flink.split(".pdf")[0].split("%2F")[1]
                      : flink.flink.split(".jpg")[0].split("%2F")[1]}
                  </h2>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
