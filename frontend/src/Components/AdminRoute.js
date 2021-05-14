import { Route } from "react-router-dom";
import Login from "../Pages/Login";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAdmin() ? <Component {...props} /> : <Login />
      }
    />
  );
};

export default AdminRoute;
