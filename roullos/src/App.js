import Poke from './Container/Poke/poke.js'
import NavBar from './Container/NavBar/navbar.js'
import PokeDetail from './Container/PokeDetail/pokedetail.js'
import Home from './Container/Home/home.js'
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import "./App.css";
import axios from "axios";

const App = () => {
  

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:id">
            <PokeDetail />
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
      
      
    </div>
  );
};
export default App;