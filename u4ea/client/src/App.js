import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import store from "./redux/store";
import { Provider } from "react-redux";

/* import PrivateRoute from "./utils/PrivateRoute"; */

/* import components here */
import Webapp from "./components/Webapp";
import SelectPage from "./components/SelectPage";



class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={SelectPage} /> 
              <Route exact path="/webapp" component={Webapp} />
              {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
