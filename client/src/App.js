import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import _Home_all_1 from './pages/Home_all_1';
import _Testlogin from './pages/Testlogin';

function App() {
  return (
    <div>
       <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/HomeAll" />
          </Route>
          <Route path="/HomeAll" exact component={_Home_all_1} />
          <Route path="/loginseccess" exact component={_Testlogin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
