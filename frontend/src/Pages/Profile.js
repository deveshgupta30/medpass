import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import ProfileForm from "../Components/ProfileForm";

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
          <div>Loading</div>
        )}
      </div>
    </>
  );
};

export default Profile;
