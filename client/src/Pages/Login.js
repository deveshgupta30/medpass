import { useState, useEffect } from "react";
import "../index.css";
import logoCircle from "../assets/logo/circle/circle_logo.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    document.title = "Sign in | MedPass";
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("User Logged In");
      const resData = await res.json();
      setLoading(false);
      setData(resData);
      console.log(resData);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // if (loading) {
  //   return <div className="text-4xl">LOADINGGGGGGGGGGGGGGGGGGGGGGG</div>;
  // }

  // if (error) {
  //   return <div className="text-4xl">ERRORRRRRRRRRRRRRRRRRRRRRRRRR</div>;
  // }

  return (
    <>
      <div
        className="w-full h-full font-quickSand font-medium"
        style={{ backgroundColor: "#f1efef" }}
      >
        <header class="flex items-center justify-center py-3">
          <div>
            <img class="h-16 sm:h-16" src={logoCircle} alt="Logo" />
          </div>
          <div class="text-4xl ml-4 text-blue-900 font-medium">MedPass</div>
        </header>
        <div class="items-center justify-center">
          <div class="text-center mt-10">
            <h2 class="text-2xl font-semibold tracking-tight">Sign in</h2>

            <span class="text-sm">
              or &nbsp;
              <Link className="text-blue-700" to="/register">
                register
              </Link>
            </span>
          </div>

          <div class="flex justify-center my-2 mx-4 md:mx-0">
            <form
              onSubmit={handleFormSubmit}
              class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
            >
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 pt-4 mb-6">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email address
                  </label>
                  <input
                    class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:shadow-outline hover:border-blue-500"
                    type="email"
                    placeholder="Email ID"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="w-full md:w-full px-3 mb-6">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:shadow-outline hover:border-blue-500"
                    type="password"
                    placeholder="••••••••"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="w-full md:w-full px-3 mb-1">
                  <button
                    class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
