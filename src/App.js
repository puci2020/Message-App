/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import Chat from './components/Chat';
import Container from './components/Container';
import Login from './components/Login';
import Registration from './components/Registration';
import ChatSettings from './pages/ChatSettings';
import UserSettings from './pages/UserSettings';
import AuthProvider from './services/AuthProvider';
import ProtectedRouter from './utils/ProtectedRouter';
import Loader from './components/Loader';
import { useStateValue } from './services/StateProvider';
import { actionTypes } from './services/reducer';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  width: 100vw;
  /* display: grid;
  place-items: center; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const App = () => {
  const [{ loader }, dispatch] = useStateValue();

  return (
    <AuthProvider>
      <Wrapper>
        {/* {loader && <Loader />} */}
        <Router>
          <Switch>
            <ProtectedRouter exact path="/" component={Chat} />
            <ProtectedRouter path="/room/:id" component={Chat} />
            <ProtectedRouter
              path="/settings/user/:id"
              component={UserSettings}
            />
            <ProtectedRouter
              path="/settings/room/:id"
              component={ChatSettings}
            />

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    </AuthProvider>
  );
};
export default App;
