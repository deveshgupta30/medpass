import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App.js";

import AuthProvider from "./Context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
