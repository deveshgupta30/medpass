import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import error404 from "./assets/img/404img.webp";
import { Helmet } from "react-helmet";

function page404() {
  return (
    <div className="h-screen flex items-center justify-center content-center w-full">
      <Helmet>
        <style>{`body{background-color: #131311}`}</style>
      </Helmet>
      <img
        className="object-contain w-full h-full transform scale-50"
        alt="Error 404"
        src={error404}
      ></img>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Signup} />
        <Route component={page404} />
      </Switch>
    </Router>
  );
}
