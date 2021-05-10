import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { authState } = useContext(AuthContext);

  const { userInfo } = authState;

  const [name, setName] = useState(userInfo.name ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo.email ? userInfo.email : "");

  return (
    <>
      <Helmet>
        <title>{userInfo.name ? userInfo.name : ""} | MedPass</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="w-full justify-items-center ">
          <form>
            <div className="container mx-auto ">
              <div className="  mt-10 rounded px-4">
                <div className="xl:w-full border-b border-blue-500  py-5">
                  <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                    <p className="text-3xl text-gray-800  font-bold">Profile</p>
                  </div>
                </div>
                <div className="mx-auto pt-4">
                  <div className="container mx-auto">
                    <form className="my-6 w-11/12 mx-auto xl:w-full xl:mx-0">
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="name"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border border-gray-500 pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="email"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Email
                        </label>
                        <div className="border  border-gray-500 focus:outline-none focus:border-blue-500 shadow-sm rounded flex">
                          <div className="px-4 py-3  items-center border-r border-gray-500 focus:outline-none focus:border-blue-500 flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-mail"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#71717A"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <rect x="3" y="5" width="18" height="14" rx="2" />
                              <polyline points="3 7 12 13 21 7" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            required
                            className="pl-3 py-3 w-full text-sm font-normal placeholder-gray-500 rounded bg-transparent text-gray-700  focus:outline-none focus:border-blue-500"
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="gender"
                          className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                        >
                          Gender
                        </label>
                        <div className="border border-gray-500 focus:border-blue-500 shadow-sm rounded flex">
                          <input
                            type="text"
                            id="gender"
                            name="gender"
                            required
                            disabled="true"
                            className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-blue-500 bg-transparent rounded placeholder-gray-500 text-gray-700 "
                            placeholder="Select Gender"
                          />
                          <div className="px-4 flex items-center border-l border-gray-500  flex-col justify-center text-gray-700 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-chevron-down"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#71717A"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="bloodGroup"
                          className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                        >
                          Blood Group
                        </label>
                        <div className="border border-gray-500 focus:border-blue-500 shadow-sm rounded flex">
                          <input
                            type="text"
                            id="bloodGroup"
                            name="bloodGroup"
                            required
                            disabled="true"
                            className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-blue-500 bg-transparent rounded placeholder-gray-500 text-gray-700 "
                            placeholder="Select Blood Group"
                          />
                          <div className="px-4 flex items-center border-l border-gray-500  flex-col justify-center text-gray-700 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-chevron-down"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#71717A"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="dateOfBirth"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          required
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="DOB"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="address"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Present Address
                        </label>
                        <textarea
                          type="text"
                          id="address"
                          name="address"
                          required
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Present Address"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="height"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Height
                        </label>
                        <input
                          type="number"
                          id="height"
                          name="height"
                          required
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Your height in cm"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="weight"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Weight
                        </label>
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          required
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Your weight in kg"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="bmi"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          BMI
                        </label>
                        <input
                          type="number"
                          id="bmi"
                          name="bmi"
                          required
                          readOnly="true"
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Your BMI will be calculated here"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="allergies"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Allergies
                        </label>
                        <textarea
                          type="text"
                          id="allergies"
                          name="allergies"
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Enter your allergies, if any"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="contactNumber"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          minLength="10"
                          maxLength="10"
                          required
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Contact no. (excl. country code)"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="emergencyContactNumber"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Emergency Contact Number
                        </label>
                        <input
                          type="tel"
                          id="emergencyContactNumber"
                          name="emergencyContactNumber"
                          minLength="10"
                          maxLength="10"
                          required
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Emergency Contact no. (excl. country code)"
                        />
                      </div>
                      <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label
                          for="emergencyContactNumber2"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Emergency Contact Number 2
                        </label>
                        <input
                          type="tel"
                          id="emergencyContactNumber2"
                          name="emergencyContactNumber2"
                          minLength="10"
                          maxLength="10"
                          className="border border-gray-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                          placeholder="Emergency Contact no. 2 (excl. country code)"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
