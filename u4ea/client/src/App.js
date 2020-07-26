import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

/* import components here */
import Webapp from "./components/Webapp";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Webapp} />
      </Switch>
    </Router>
  );
}

export default App;
