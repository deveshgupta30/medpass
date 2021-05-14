import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import ProfileForm from "../Components/ProfileForm";
import CreateProfile from "../Components/CreateProfile";

const Profile = () => {
  const { authState } = useContext(AuthContext);

  const [loading, setLoading] = useState("");
  const [error, setError] = useState({ isError: false, message: "" });
  const [profileData, setProfileData] = useState(null);

  const { userInfo, accessToken } = authState;

  const getProfileData = async (abortController, signal) => {
    try {
      setLoading(true);
      console.log({ accessToken });
      const res = await fetch("http://localhost:5000/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
      });

      const resData = await res.json();
      setLoading(false);
      if (res.ok) {
        setProfileData({ ...resData });
        console.log({ resData });
      }
      if (!resData.success) {
        setError({ ...error, isError: true, message: resData.message });
        abortController.abort();
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      setError({ ...error, isError: true, message: err.message });
      abortController.abort();
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    getProfileData(abortController, signal);
    return () => abortController.abort;
  }, []);

  return (
    <>
      <Helmet>
        <title>{userInfo.name ? userInfo.name : ""} | MedPass</title>
      </Helmet>
      <div className="mb-10">
        <Navbar />
        {profileData ? (
          <ProfileForm userData={profileData} />
        ) : (
          <>
            <div className="container max-w-screen-2xl flex mx-auto p-4 bg-red-400 text-white rounded-md mb-6 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 fill-current text-white"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Please fill the form.
            </div>
            <CreateProfile
              userData={{
                name: userInfo.name ? userInfo.name : "",
                email: userInfo.email ? userInfo.email : "",
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
