/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import React, { Suspense } from 'react';
// import Chat from './components/Chat/Chat';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import ChatSettings from './pages/ChatSettings';
// import UserSettings from './pages/UserSettings';
// import AuthProvider from './services/AuthProvider';
// import ProtectedRouter from './utils/ProtectedRouter';
import Offline from 'pages/Offline';
import Loader from './components/Loader';

const Login = React.lazy(() => import('pages/Login/Login'));
const Chat = React.lazy(() => import('./components/Chat/Chat'));
const Registration = React.lazy(() => import('./pages/Registration'));
const ChatSettings = React.lazy(() => import('./pages/ChatSettings'));
const UserSettings = React.lazy(() => import('./pages/UserSettings'));
const AuthProvider = React.lazy(() => import('./services/AuthProvider'));
const ProtectedRouter = React.lazy(() => import('./utils/ProtectedRouter'));

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
  <Suspense fallback={<Loader />}>
    <AuthProvider>
      <Wrapper>
        <Router>
          <Switch>
            <ProtectedRouter exact
                             path='/'
                             component={Chat} />
            <ProtectedRouter path='/room/:id'
                             component={Chat} />
            <ProtectedRouter path='/settings/user/:id'
                             component={UserSettings} />
            <ProtectedRouter path='/settings/room/:id'
                             component={ChatSettings} />
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/registration'>
              <Registration />
            </Route>
            <Route path='/offline'>
              <Offline />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    </AuthProvider>
  </Suspense>
);
export default App;
