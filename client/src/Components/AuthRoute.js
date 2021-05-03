import { Route } from "react-router-dom";
import Login from "../Pages/Login";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  // const isAuthenticated = true;
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Login />
      }
    />
  );
};

export default AuthRoute;
