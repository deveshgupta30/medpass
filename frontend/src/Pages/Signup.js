import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Logo from "../Components/Logo";
import { AuthContext } from "../Context/AuthContext";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Signup = () => {
  const { isAuthenticated, setAuthState } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f1efef";
  }, []);

  const signup = async (name, email, password) => {
    const abortController = new AbortController();
    const { signal } = abortController;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        signal,
      });

      const resData = await res.json();
      setLoading(false);
      if (res.ok) {
        setAuthState(resData);
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

  const onSubmitHandler = (data) => {
    console.log({ data });
    signup(data.name, data.email, data.password);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      history.push("/profile");
    }
  }, [isAuthenticated, history]);

  return (
    <>
      <Helmet>
        <title>Register | MedPass</title>
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
            <h2 className="text-2xl font-semibold tracking-tight">
              Register for a new account
            </h2>

            <span className="text-sm">
              Have an account? &nbsp;
              <Link className="text-blue-700" to="/login">
                Log in
              </Link>
            </span>
          </div>

          <div className="flex justify-center my-2 mx-4 md:mx-0">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {error.isError && error.message && (
                <div className="p-4 text-lg bg-red-300 text-red-700 rounded">
                  {error.message}
                </div>
              )}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 pt-4 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    className={`appearance-none block w-full shadow-sm bg-transparent tracking-wide placeholder-gray-500 text-gray-700 font-medium  rounded-lg py-3 px-3 leading-tight focus:outline-none ${
                      errors.name
                        ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                        : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                    }`}
                    type="text"
                    placeholder="Full Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Please enter your full name.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <small className="error">{message}</small>
                    )}
                  />
                </div>
                <div className="w-full md:w-full px-3 pt-4 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email address
                  </label>
                  <input
                    className={`appearance-none block w-full shadow-sm bg-transparent tracking-wide placeholder-gray-500 text-gray-700 font-medium  rounded-lg py-3 px-3 leading-tight focus:outline-none ${
                      errors.email
                        ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                        : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                    }`}
                    type="text"
                    placeholder="Email ID"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Please enter your email.",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <small className="error">{message}</small>
                    )}
                  />
                </div>
                <div className="w-full md:w-full px-3 pt-4 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    className={`appearance-none block w-full shadow-sm bg-transparent tracking-wide placeholder-gray-500 text-gray-700 font-medium  rounded-lg py-3 px-3 leading-tight focus:outline-none ${
                      errors.password
                        ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                        : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                    }`}
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please enter your password.",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must have atleast 8 characters.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <small className="error">{message}</small>
                    )}
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-1">
                  <button
                    className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-gray-700 focus:border-gray-500 transition-colors duration-150"
                    type="submit"
                  >
                    Register
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

export default Signup;
