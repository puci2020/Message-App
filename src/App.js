/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import React, { Suspense } from 'react';
import { render } from 'react-dom';
import Chat from './components/Chat/Chat';
import Container from './components/Container';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ChatSettings from './pages/ChatSettings';
import UserSettings from './pages/UserSettings';
import AuthProvider from './services/AuthProvider';
import ProtectedRouter from './utils/ProtectedRouter';
import Loader from './components/Loader';
import { useStateValue } from './services/StateProvider';
import Sidebar from './components/Sidebar';

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

const App = () => (
  <AuthProvider>
    <Wrapper>
      <Router>
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </Router>
    </Wrapper>
  </AuthProvider>
);
export default App;
