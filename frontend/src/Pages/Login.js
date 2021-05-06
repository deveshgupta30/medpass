import { useState, useLayoutEffect, useContext, useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Logo from "../Components/Logo";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { setAuthState, isAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f1efef";
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
      setAuthState(resData);
      setError({ ...error, isError: false, message: "" });
    } catch (err) {
      console.log({ err });
      setLoading(false);
      setError({ ...error, isError: true, message: err.message });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      history.push(redirect);
    }
  }, [isAuthenticated()]);

  return (
    <>
      {/* {isAuthenticated() && <Redirect to="/dashboard" />} */}
      <Helmet>
        <title>Login | MedPass</title>
      </Helmet>

      <div className="w-full h-full font-quickSand font-medium">
        <header className="flex items-center justify-center py-3">
          <div>
            <Logo />
          </div>
          <div className="text-4xl ml-4 text-blue-900 font-medium">MedPass</div>
        </header>
        <div className="items-center justify-center">
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>

            <span className="text-sm">
              or &nbsp;
              <Link className="text-blue-700" to="/register">
                register
              </Link>
            </span>
          </div>

          <div className="flex justify-center my-2 mx-4 md:mx-0">
            {error.isError && (
              <div className="p-4 text-lg bg-red-300 text-red-700 ">
                {error.message}
              </div>
            )}
            <form
              onSubmit={handleFormSubmit}
              className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 pt-4 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email address
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:shadow-outline hover:border-blue-500"
                    type="email"
                    placeholder="Email ID"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:shadow-outline hover:border-blue-500"
                    type="password"
                    placeholder="••••••••"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-1">
                  <button
                    className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-gray-700 focus:border-gray-500 transition-colors duration-150"
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
