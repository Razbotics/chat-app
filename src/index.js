import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import * as serviceWorker from "./serviceWorker";
import { config } from "./firebase-config";
import "./index.css";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp(config);

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect from="/" exact to="/login" />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
