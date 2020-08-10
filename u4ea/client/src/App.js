import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import PrivateRoute from "./utils/PrivateRoute";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

/* import components here */
import Webapp from "./components/Webapp";
import SelectPage from "./components/SelectPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  // Process token, set user, then logout
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={SelectPage} /> 
              <Route exact path="/webapp" component={Webapp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {/* Change to prive route */}
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
