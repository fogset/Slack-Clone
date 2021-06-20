import './App.css';
import React from "react";
import Header from './components/Header.js'
import styled from 'styled-components';
import Sidebar from './components/Sidebar.js'
import Chat from './components/Chat.js'
import { useAuthState } from "react-firebase-hooks/auth"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/Login"


function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact>
                <Chat />
              </Route>
            </Switch>
          </AppBody>
        </div>
      )}
    </Router>
  );
}


export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`
