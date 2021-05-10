import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Profile = () => {
  const { authState } = useContext(AuthContext);

  const { userInfo } = authState;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    console.log({ data });
  };

  return (
    <>
      <Helmet>
        <title>{userInfo.name ? userInfo.name : ""} | MedPass</title>
      </Helmet>
      <div className="mb-10">
        <Navbar />
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="w-full justify-items-center mt-8">
            <div className="w-3/5 mx-auto">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <div class=" mb-3 p-2 rounded-full bg-gray-200 flex items-center justify-center ">
                      {/* TO-DO to change profile picture on upload*/}
                      <img
                        class="w-full h-full overflow-hidden object-cover rounded-full"
                        src="/assets/img/person.svg"
                        alt="profile pic"
                        draggable="false"
                      />
                    </div>
                    <h3 className="mt-6 text-4xl font-medium break-normal text-gray-900">
                      {userInfo.name ? userInfo.name : ""}
                    </h3>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <fieldset>
                    <div className="rounded-lg shadow-md p-6 hover:shadow-xl bg-white transition-shadow duration-300 sm:overflow-hidden">
                      <div className="px-4 py-5  space-y-6 sm:p-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-800">
                            Photo
                          </label>
                          <div className="mt-1 flex items-center">
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              <img
                                class="w-full h-full overflow-hidden object-cover rounded-full"
                                src="/assets/img/person.svg"
                                alt="profile pic"
                                draggable="false"
                              />
                            </span>
                            <button
                              type="button"
                              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Change
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col mb-2">
                          <label
                            for="name"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            {...register("name", {
                              required: {
                                value: true,
                                message: "Please enter your name.",
                              },
                            })}
                            className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                              errors.name
                                ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                            } placeholder-gray-500 text-gray-700 `}
                            placeholder="Full Name"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }) => (
                              <small className="error">{message}</small>
                            )}
                          />
                        </div>

                        <div className=" flex flex-col mb-2">
                          <label
                            for="email"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Email
                          </label>
                          <div
                            className={`shadow-sm rounded flex ${
                              errors.email
                                ? "focus-within:ring-2 focus-within:ring-red-300 border border-red-500"
                                : "focus-within:ring-2 focus-within:ring-blue-300 border border-blue-500"
                            }`}
                          >
                            <div
                              className={`px-4 py-3  items-center border-r ${
                                errors.email
                                  ? "border-red-500"
                                  : "border-blue-500"
                              }  focus:outline-none  flex`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-mail"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#71717A"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect
                                  x="3"
                                  y="5"
                                  width="18"
                                  height="14"
                                  rx="2"
                                />
                                <polyline points="3 7 12 13 21 7" />
                              </svg>
                            </div>
                            <input
                              type="email"
                              {...register("email", {
                                required: {
                                  value: true,
                                  message: "Please enter your email.",
                                },
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Enter a valid e-mail address",
                                },
                              })}
                              className="pl-3 py-3 w-full text-sm font-normal placeholder-gray-500 rounded bg-concurrent text-gray-700  focus:outline-none "
                              placeholder="Email ID"
                            />
                          </div>
                          <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => (
                              <small className="error">{message}</small>
                            )}
                          />
                        </div>

                        <div className="flex flex-col mb-6">
                          <label
                            for="dateOfBirth"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            {...register("dateOfBirth", {
                              required: {
                                value: true,
                                message: "Please select your date of birth.",
                              },
                            })}
                            className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                              errors.dateOfBirth
                                ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                            } placeholder-gray-500 text-gray-700 `}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="dateOfBirth"
                            render={({ message }) => (
                              <small className="error">{message}</small>
                            )}
                          />
                        </div>

                        <div className="flex flex-col mb-6">
                          <label
                            for="contactNumber"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Contact Number
                          </label>
                          <input
                            type="tel"
                            {...register("contactNumber", {
                              required: {
                                value: true,
                                message: "Please enter your contact number.",
                              },
                              minLength: {
                                value: 10,
                                message: "Contact number must be of length 10.",
                              },
                              maxLength: {
                                value: 10,
                                message: "Contact number must be of length 10.",
                              },
                            })}
                            className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                              errors.contactNumber
                                ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                            } placeholder-gray-500 text-gray-700 `}
                            placeholder="Contact no. (excl. country code)"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="contactNumber"
                            render={({ message }) => (
                              <small className="error">{message}</small>
                            )}
                          />
                        </div>

                        <div className="flex flex-col mb-6">
                          <label
                            for="emergencyContactNumber"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Emergency Contact Number
                          </label>
                          <input
                            type="tel"
                            {...register("emergencyContactNumber", {
                              required: {
                                value: true,
                                message:
                                  "Please enter an emergency contact number.",
                              },
                              minLength: {
                                value: 10,
                                message: "Contact number must be of length 10.",
                              },
                              maxLength: {
                                value: 10,
                                message: "Contact number must be of length 10.",
                              },
                            })}
                            className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                              errors.emergencyContactNumber
                                ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                            } placeholder-gray-500 text-gray-700 `}
                            placeholder="Emergency Contact no. (excl. country code)"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="emergencyContactNumber"
                            render={({ message }) => (
                              <small className="error">{message}</small>
                            )}
                          />
                        </div>

                        <div className="flex flex-col mb-6">
                          <label
                            for="emergencyContactNumber2"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Emergency Contact Number 2
                          </label>
                          <input
                            type="tel"
                            {...register("emergencyContactNumber2", {
                              minLength: {
                                value: 10,
                                message: "Contact number must be of length 10.",
                              },
                              maxLength: {
                                value: 10,
                                message: "Contact number must be of length 10.",
                              },
                            })}
                            className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                              errors.emergencyContactNumber2
                                ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                            } placeholder-gray-500 text-gray-700 `}
                            placeholder="Emergency Contact no. 2 (excl. country code)"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="emergencyContactNumber2"
                            render={({ message }) => (
                              <small className="error">{message}</small>
                            )}
                          />
                        </div>

                        <div className="flex flex-col mb-6">
                          <label
                            for="address"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Present Address
                          </label>
                          <textarea
                            type="text"
                            {...register("address", {
                              required: {
                                value: true,
                                message: "Please enter your address.",
                              },
                            })}
                            className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                              errors.address
                                ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                            } placeholder-gray-500 text-gray-700 `}
                            placeholder="Present Address"
                          />
                          <ErrorMessage
                            errors={errors}
                            name="address"
                            render={({ message }) => (
                              <small className="error">{message}</small>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5 m-8">
                <div className="border-t border-gray-400" />
              </div>
            </div>

            <div className="w-3/5 mx-auto">
              <div className="">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <legend className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Health Information
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        These will help a doctor get a brief idea about the
                        common health terms.
                      </p>
                    </legend>
                  </div>
                  <div className="md:col-span-2">
                    <fieldset>
                      <div className="rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow bg-white duration-300 overflow-hidden ">
                        <div className="px-4 py-5  sm:p-6">
                          <div className="flex flex-col mb-6">
                            <label
                              for="bloodGroup"
                              className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                            >
                              Blood Group
                            </label>
                            <div
                              className={`shadow-sm rounded flex ${
                                errors.bloodGroup
                                  ? "focus-within:ring-2 focus-within:ring-red-300 border border-red-500"
                                  : "focus-within:ring-2 focus-within:ring-blue-300 border border-blue-500"
                              }`}
                            >
                              <input
                                type="text"
                                {...register("bloodGroup", {
                                  required: {
                                    value: true,
                                    message: "Please select your blood group.",
                                  },
                                })}
                                disabled="true"
                                className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-blue-500 bg-transparent rounded placeholder-gray-500 text-gray-700 "
                                placeholder="Select Blood Group"
                              />
                              <div
                                className={`px-4 py-3  items-center border-l ${
                                  errors.bloodGroup
                                    ? "border-red-500"
                                    : "border-blue-500"
                                }  focus:outline-none  flex`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-chevron-down"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="#71717A"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </div>
                            </div>
                            <ErrorMessage
                              errors={errors}
                              name="bloodGroup"
                              render={({ message }) => (
                                <small className="error">{message}</small>
                              )}
                            />
                          </div>

                          <div className="flex flex-col mb-6">
                            <label
                              for="gender"
                              className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                            >
                              Gender
                            </label>
                            <div
                              className={`shadow-sm rounded flex ${
                                errors.gender
                                  ? "focus-within:ring-2 focus-within:ring-red-300 border border-red-500"
                                  : "focus-within:ring-2 focus-within:ring-blue-300 border border-blue-500"
                              }`}
                            >
                              <input
                                type="text"
                                {...register("gender", {
                                  required: {
                                    value: true,
                                    message: "Please select your gender.",
                                  },
                                })}
                                disabled="true"
                                className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-blue-500 bg-transparent rounded placeholder-gray-500 text-gray-700 "
                                placeholder="Select Gender"
                              />
                              <div
                                className={`px-4 py-3  items-center border-l ${
                                  errors.gender
                                    ? "border-red-500"
                                    : "border-blue-500"
                                }  focus:outline-none  flex`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-chevron-down"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="#71717A"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </div>
                            </div>
                            <ErrorMessage
                              errors={errors}
                              name="gender"
                              render={({ message }) => (
                                <small className="error">{message}</small>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mb-6">
                              <label
                                for="height"
                                className="pb-2 text-sm font-bold text-gray-800 "
                              >
                                Height
                              </label>
                              <input
                                type="number"
                                {...register("height", {
                                  required: {
                                    value: true,
                                    message: "Please enter your height.",
                                  },
                                  min: {
                                    value: 0,
                                    message: "Height must be above 0cm.",
                                  },
                                })}
                                className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                                  errors.height
                                    ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                    : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                                } placeholder-gray-500 text-gray-700 `}
                                placeholder="Your height in cm"
                              />
                              <ErrorMessage
                                errors={errors}
                                name="height"
                                render={({ message }) => (
                                  <small className="error">{message}</small>
                                )}
                              />
                            </div>

                            <div className="flex flex-col mb-6">
                              <label
                                for="weight"
                                className="pb-2 text-sm font-bold text-gray-800 "
                              >
                                Weight
                              </label>
                              <input
                                type="number"
                                {...register("weight", {
                                  required: {
                                    value: true,
                                    message: "Please enter your weight.",
                                  },
                                  min: {
                                    value: 0,
                                    message: "Weight must be above 0kg.",
                                  },
                                })}
                                className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-normal focus:outline-none ${
                                  errors.weight
                                    ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                                    : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                                } placeholder-gray-500 text-gray-700 `}
                                placeholder="Your weight in kg"
                              />
                              <ErrorMessage
                                errors={errors}
                                name="weight"
                                render={({ message }) => (
                                  <small className="error">{message}</small>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col mb-6">
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
                              disabled="true"
                              className="border border-blue-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:ring-2 disabled:border-blue-500 focus:ring-blue-300 placeholder-gray-500 text-gray-700 "
                              placeholder="0"
                            />
                          </div>

                          <div className="flex flex-col mb-6">
                            <label
                              for="allergies"
                              className="pb-2 text-sm font-bold text-gray-800 "
                            >
                              Allergies
                            </label>
                            <textarea
                              type="text"
                              {...register("allergies")}
                              className="border border-blue-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700 "
                              placeholder="Enter your allergies, if any"
                            />
                            <ErrorMessage
                              errors={errors}
                              name="allergies"
                              render={({ message }) => (
                                <small className="error">{message}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
