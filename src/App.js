import './App.css';
import React from "react";
import Header from './components/Header.js'
import styled from 'styled-components';
import Sidebar from './components/Sidebar.js'

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
        <Header />

        <AppBody>
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              {/*chat*/}
            </Route>
          </Switch>
        </AppBody>

      </div>
    </Router>
  );
}


export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`
