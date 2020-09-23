import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from './components/login';
import Dashboard from './components/dashboard';
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyB0ORzA03DMG4TxbqyOfO0lEyWahErolP4",
  authDomain: "chat-app-878e3.firebaseapp.com",
  databaseURL: "https://chat-app-878e3.firebaseio.com",
  projectId: "chat-app-878e3",
  storageBucket: "chat-app-878e3.appspot.com",
  messagingSenderId: "75550798120",
  appId: "1:75550798120:web:3b7aa0a14eb68fb766201d",
  measurementId: "G-X3LSYNRQJ0",
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
