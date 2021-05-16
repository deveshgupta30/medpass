import { useState, useEffect, useContext, Children } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import UserCard from "../Components/UserCard";

const AdminPortal = () => {
  const [term, setTerm] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [filterUser, setFilterUser] = useState([...allUser]);

  const [searchType, setSearchType] = useState("useEmail");

  const [error, setError] = useState({ isError: false, message: "" });
  const { authState } = useContext(AuthContext);
  const { accessToken } = authState;

  const filterByUser = () => {
    if (term === "") {
      setFilterUser([...allUser]);
    }
    const selectedUser = allUser.filter((user) => {
      if (searchType === "useName") {
        return user.userId.name.toLowerCase().includes(term);
      } else if (searchType === "useEmail") {
        return user.userId.email.startsWith(term);
      } else {
        return user;
      }
    });
    setFilterUser([...selectedUser]);
  };

  const fetchallUser = async () => {
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
        setFilterUser([...resData.allProfileData]);
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };

  useEffect(() => {
    fetchallUser();
  }, []);
  console.log({ allUser });
  useEffect(() => {
    filterByUser();
  }, [term, searchType]);

  return (
    <>
      <Helmet>
        <title>Admin Portal | MedPass</title>
      </Helmet>

      <div className="container mx-auto p-2">
        <Navbar />
        <div className=" flex items-center mx-auto p-4 ">
          <input
            type="text"
            className="  w-screen mx-auto  max-w-4xl p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            id="filter"
            aria-label="Search for users using name or email ID"
            value={term}
            onChange={(e) => setTerm(e.target.value.toLowerCase())}
            placeholder="Search for users"
            autoComplete="false"
          />
        </div>
        <div className="flex items-center mt-2 mb-4  space-x-4 justify-center mx-auto px-4">
          <input
            className="form-radio h-5 w-5 "
            type="radio"
            name="email"
            checked={searchType === "useEmail"}
            value="useEmail"
            onChange={(e) => setSearchType("useEmail")}
          />
          &nbsp;Search using email
          <input
            className="form-radio h-5 w-5 "
            type="radio"
            name="name"
            value="useName"
            checked={searchType === "useName"}
            onChange={(e) => setSearchType("useName")}
          />
          &nbsp;Search using name
        </div>
        <div>
          <div className="flex items-center mx-auto px-4">
            <div className="w-screen">
              <table className="mx-auto max-w-4xl w-screen whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                <thead className="bg-gray-50">
                  <tr className="text-gray-600 text-center">
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      Name
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      Gender
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      BloodGroup
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 ">
                      Contact Info
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filterUser.length
                    ? Children.toArray(
                        filterUser.map((user) => <UserCard userData={user} />)
                      )
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPortal;
