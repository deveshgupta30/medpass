import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const UserCard = (userData) => {
  const [allUser, setAllUser] = useState([]);
  const [filterUser, setFilterUser] = useState([...allUser]);
  const [error, setError] = useState({ isError: false, message: "" });
  const { authState } = useContext(AuthContext);
  const { accessToken } = authState;

  const fetchAllUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const resData = await res.json();
      if (res.ok) {
        setAllUser([...resData.allProfileData]);
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };

  const userGender = () => {
    const selectedUser = allUser.filter((Gender) => Gender.gender);
    setFilterUser([...selectedUser]);
  };

  useEffect(() => {
    // const abortController = new AbortController();
    // const { signal } = abortController;

    fetchAllUser();
    userGender();
    // return () => abortController.abort();
  }, []);

  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-gray-800 text-md font-bold tracking-wide">
              {userData.name}
            </p>
            <p className="text-gray-500 text-sm font-semibold tracking-wide">
              {userData.email}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {/* {filterUser.map((user) => (
          <p key={user._id} className="px-6 py-4 text-center">
            {user.gender}
          </p>
        ))} */}
      </td>
      <td className="px-6 py-4 text-center"></td>
      <td className="px-6 py-4 text-center"></td>
    </tr>
  );
};

export default UserCard;
