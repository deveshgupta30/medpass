import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";

const AdminPortal = () => {
  const [search, setSearch] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [filterUser, setFilterUser] = useState([...allUser]);
  const [error, setError] = useState({ isError: false, message: "" });
  const { authState } = useContext(AuthContext);
  const { accessToken } = authState;
  console.log({ allUser, filterUser });
  const filterByUser = () => {
    if (search === "") {
      setFilterUser([...allUser]);
    }
    const selectedUser = allUser.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
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
        setAllUser([...resData.allProfile]);
        setFilterUser([...resData.allProfile]);
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };

  useEffect(() => {
    // const abortController = new AbortController();
    // const { signal } = abortController;

    fetchallUser();
    // return () => abortController.abort();
  }, []);

  useEffect(() => {
    filterByUser();
  }, [search]);
  return (
    <>
      <Helmet>
        <title>Dashboard | MedPass</title>
      </Helmet>

      <div>
        <Navbar />
        <div className="container flex mx-auto p-4">
          <input
            type="text"
            name="filter"
            id="filter"
            aria-label="Search for Users"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search for Users"
          />
          {filterUser.map((user) => (
            <div key={user._id}>{user.name}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPortal;
