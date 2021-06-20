import './App.css';
import React from "react";
import Header from './components/Header.js'
import styled from 'styled-components';
import Sidebar from './components/Sidebar.js'
import Chat from './components/Chat.js'
import { useAuthState } from "react-firebase-hooks/auth"
import Spinner from "react-spinkit"

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

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />

          <Spinner
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

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
const AppLoading = styled.div`
display: grid; 
 place-items: center; 
height: 100vh;
width: 100% 
`
const AppLoadingContents = styled.div`
text-align: center;
padding-bottom: 100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

> img{
  height: 100px;
  padding: 20px;
  margin-bottom: 40px;
}
`
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`
