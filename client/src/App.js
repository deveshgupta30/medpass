import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function Home() {
  return <div className="text-6xl">404</div>;
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Signup} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}
