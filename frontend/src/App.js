import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Page404 from "./Pages/Page404";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import AuthRoute from "./Components/AuthRoute";
import AdminRoute from "./Components/AdminRoute";
import AdminPortal from "./Pages/AdminPortal";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Signup} />
        <AuthRoute path="/" exact component={Dashboard} />
        <AuthRoute path="/profile" exact component={Profile} />
        <AdminRoute path="/admin" exact component={AdminPortal} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}
