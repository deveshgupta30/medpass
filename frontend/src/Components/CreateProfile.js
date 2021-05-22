import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ImageUploader from "./ImageUploader";

const CreateProfile = ({ userData }) => {
  const { authState } = useContext(AuthContext);

  const [file, setFile] = useState("");
  const [imageError, setImageError] = useState("");
  const [error, setError] = useState({ isError: false, message: "" });

  const { userInfo, accessToken } = authState;

  const createProfileData = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/profile/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          gender: data.gender,
          bloodGroup: data.bloodGroup,
          weight: data.weight,
          height: data.height,
          contactNumber: data.contactNumber,
          emergencyNumber: data.emergencyNumber,
          emergencyNumber2: data.emergencyNumber2,
          dateOfBirth: data.dateOfBirth,
          allergies: data.allergies,
          profilePic: file,
          address: data.address,
        }),
      });

      if (res.ok) {
        alert("Successfully updated");
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...userData,
    },
  });

  const [height, weight] = watch(["height", "weight"]);
  const calculateBmi = (height, weight) => {
    const h = Number(height) / 100;
    const w = Number(weight);
    return Number((w / (h * h)).toFixed(2));
  };

  useEffect(() => {
    setValue("bmi", calculateBmi(height, weight));
  }, [height, weight]);

  const onSubmitHandler = (data) => {
    createProfileData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="w-full justify-items-center mt-8">
          <div className="w-3/5 mx-auto">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <div className=" mb-3 p-2  w-36 h-36  flex items-center justify-center ">
                    {/* TO-DO to change profile picture on upload*/}
                    <ImageUploader
                      file={file}
                      setFile={setFile}
                      error={imageError}
                      setError={setImageError}
                    />
                  </div>
                  {imageError && <small className="error">{imageError}</small>}
                  <h3 className="mt-6 text-4xl font-medium tracking-wide break-normal text-gray-900">
                    {userInfo.name ? userInfo.name : ""}
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <fieldset className=" w-full max-w-3xl">
                  <div className="rounded-lg shadow-md p-6 hover:shadow-xl bg-white transition-shadow duration-300 sm:overflow-hidden">
                    <div className="px-4 py-5  space-y-6 sm:p-6">
                      <div className="flex flex-col mb-2 ">
                        <label
                          htmlFor="name"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Full Name
                          <sup className="text-red-500 text-sm ">⋆</sup>
                        </label>
                        <input
                          type="text"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "Please enter your name.",
                            },
                          })}
                          className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide  focus:outline-none ${
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
                          htmlFor="email"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Email
                        </label>
                        <div
                          className={`shadow-sm rounded flex focus-within:ring-2 focus-within:ring-blue-300 border border-blue-500`}
                        >
                          <div
                            className={`px-4 py-3  items-center border-r border-blue-500 focus:outline-none  flex`}
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
                              <rect x="3" y="5" width="18" height="14" rx="2" />
                              <polyline points="3 7 12 13 21 7" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            readOnly={true}
                            {...register("email")}
                            className="pl-3 py-3 w-full text-sm font-medium tracking-wide placeholder-gray-500 rounded bg-concurrent text-gray-700  focus:outline-none "
                            placeholder="Email ID"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col mb-6">
                        <label
                          htmlFor="dateOfBirth"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Date of Birth
                          <sup className="text-red-500 text-sm ">⋆</sup>
                        </label>
                        <input
                          type="date"
                          {...register("dateOfBirth", {
                            required: {
                              value: true,
                              message: "Please select your date of birth.",
                            },
                          })}
                          className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide focus:outline-none ${
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
                          htmlFor="contactNumber"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Contact Number
                          <sup className="text-red-500 text-sm ">⋆</sup>
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
                          className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide focus:outline-none ${
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
                          htmlFor="emergencyNumber"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Emergency Contact Number
                          <sup className="text-red-500 text-sm ">⋆</sup>
                        </label>
                        <input
                          type="tel"
                          {...register("emergencyNumber", {
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
                          className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide focus:outline-none ${
                            errors.emergencyNumber
                              ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                              : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                          } placeholder-gray-500 text-gray-700 `}
                          placeholder="Emergency Contact no. (excl. country code)"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="emergencyNumber"
                          render={({ message }) => (
                            <small className="error">{message}</small>
                          )}
                        />
                      </div>

                      <div className="flex flex-col mb-6">
                        <label
                          htmlFor="emergencyNumber2"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Emergency Contact Number 2
                        </label>
                        <input
                          type="tel"
                          {...register("emergencyNumber2", {
                            minLength: {
                              value: 10,
                              message: "Contact number must be of length 10.",
                            },
                            maxLength: {
                              value: 10,
                              message: "Contact number must be of length 10.",
                            },
                          })}
                          className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide focus:outline-none ${
                            errors.emergencyNumber2
                              ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                              : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                          } placeholder-gray-500 text-gray-700 `}
                          placeholder="Emergency Contact no. 2 (excl. country code)"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="emergencyNumber2"
                          render={({ message }) => (
                            <small className="error">{message}</small>
                          )}
                        />
                      </div>

                      <div className="flex flex-col mb-6">
                        <label
                          htmlFor="address"
                          className="pb-2 text-sm font-bold text-gray-800 "
                        >
                          Present Address
                          <sup className="text-red-500 text-sm ">⋆</sup>
                        </label>
                        <textarea
                          type="text"
                          {...register("address", {
                            required: {
                              value: true,
                              message: "Please enter your address.",
                            },
                          })}
                          className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide focus:outline-none ${
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
                    <h3 className="text-lg font-medium tracking-wide leading-6 text-gray-900">
                      Health Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      These will help a doctor get a brief idea about the common
                      health terms.
                    </p>
                  </legend>
                </div>
                <div className="md:col-span-2">
                  <fieldset className="w-full max-w-3xl">
                    <div className="rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow bg-white duration-300 overflow-hidden ">
                      <div className="px-4 py-5  sm:p-6">
                        <div className="flex flex-col mb-6">
                          <label
                            htmlFor="bloodGroup"
                            className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >
                            Blood Group
                            <sup className="text-red-500 text-sm ">⋆</sup>
                          </label>
                          <div
                            className={`shadow-sm rounded flex flex-row justify-start items-center overflow-hidden relative ${
                              errors.bloodGroup
                                ? "focus-within:ring-2 focus-within:ring-red-300 border border-red-500"
                                : "focus-within:ring-2 focus-within:ring-blue-300 border border-blue-500"
                            }`}
                          >
                            <select
                              {...register("bloodGroup", {
                                required: {
                                  value: true,
                                  message: "Please select your blood group.",
                                },
                              })}
                              className="pl-3 py-3 h-full appearance-none w-full text-sm focus:outline-none border border-transparent  bg-transparent rounded placeholder-gray-500 text-gray-700 "
                            >
                              <option value="" className="hidden">
                                Select Blood Group
                              </option>
                              {[
                                "A+",
                                "A-",
                                "B+",
                                "B-",
                                "O+",
                                "O-",
                                "AB+",
                                "AB-",
                              ].map((item) => (
                                <option value={item} key={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            <div
                              className={`px-4 py-3 absolute inset-y-0 right-0 flex items-center pointer-events-none border-l ${
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
                            htmlFor="gender"
                            className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >
                            Gender
                            <sup className="text-red-500 text-sm ">⋆</sup>
                          </label>
                          <div
                            className={`shadow-sm rounded flex flex-row justify-start items-center overflow-hidden relative ${
                              errors.gender
                                ? "focus-within:ring-2 focus-within:ring-red-300 border border-red-500"
                                : "focus-within:ring-2 focus-within:ring-blue-300 border border-blue-500"
                            }`}
                          >
                            <select
                              type="text"
                              {...register("gender", {
                                required: {
                                  value: true,
                                  message: "Please select your gender.",
                                },
                              })}
                              className="pl-3 py-3 w-full text-sm appearance-none focus:outline-none border border-transparent bg-transparent rounded placeholder-gray-500 text-gray-700 "
                            >
                              <option value="" className="hidden">
                                Select Gender
                              </option>
                              {["Male", "Female", "Other"].map((item) => (
                                <option value={item} key={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            <div
                              className={`px-4 py-3 absolute inset-y-0 right-0 flex items-center pointer-events-none border-l ${
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
                              htmlFor="height"
                              className="pb-2 text-sm font-bold text-gray-800 "
                            >
                              Height
                              <sup className="text-red-500 text-sm ">⋆</sup>
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
                              className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide focus:outline-none ${
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
                              htmlFor="weight"
                              className="pb-2 text-sm font-bold text-gray-800 "
                            >
                              Weight
                              <sup className="text-red-500 text-sm ">⋆</sup>
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
                              className={` pl-3 py-3 shadow-sm bg-transparent rounded text-sm font-medium tracking-wide focus:outline-none ${
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
                            htmlFor="bmi"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            BMI
                          </label>
                          <input
                            type="number"
                            id="bmi"
                            name="bmi"
                            readOnly={true}
                            {...register("bmi")}
                            className="border border-blue-500  pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:ring-2 disabled:border-blue-500 focus:ring-blue-300 placeholder-gray-500 text-gray-700 "
                            placeholder="0"
                          />
                        </div>

                        <div className="flex flex-col mb-6">
                          <label
                            htmlFor="allergies"
                            className="pb-2 text-sm font-bold text-gray-800 "
                          >
                            Allergies
                          </label>
                          <textarea
                            type="text"
                            {...register("allergies")}
                            // TODO VALIDATION RINGS
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
                      <div className="px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    </>
  );
};

export default CreateProfile;
