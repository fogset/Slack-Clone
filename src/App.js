import './App.css';
import React from "react";
import Header from './components/Header.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  // const REACT_VERSION = React.version;
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Header />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
