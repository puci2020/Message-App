import { Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, ExitToApp, SearchOutlined } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toggleTheme from 'state/actions/themeStyleActions';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import alertify from 'alertifyjs';
// eslint-disable-next-line import/no-unresolved
import db from 'services/Firebase';
import firebase from 'firebase';
import toggleSidebar from 'state/actions/sidebarActions';
import { useAuth } from 'services/AuthProvider';
import { useStateValue } from 'services/StateProvider';
import BottomButtons from 'components/Sidebar/BottomButtons';
import ThemeSwitch from 'components/ThemeSwitch';
// import ChatItem from './ChatItem';
// import Header from './Header';
// import Input from './Input';
// import SidebarBody from './SidebarBody';

const ChatItem = React.lazy(() => import('components/ChatItem'));
const Header = React.lazy(() => import('components/Header'));
const Input = React.lazy(() => import('components/Input'));
const SidebarBody = React.lazy(() => import('components/Sidebar/SidebarBody'));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;
  background-color: ${({ theme }) => theme.colors.primary};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.tablet} {
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    transform: ${(props) =>
            props.mobile ? 'translateX(0)' : 'translateX(-120%)'};
    transition: transform 0.35s ease-in-out;
    z-index: 2;
    width: 80%;
    height: 100vh;
    max-width: 400px;
  }
`;

const Sidebar = () => {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const { currentUser, logOut } = useAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    await logOut();
    history.push('/login');
  };

  return (
    <Wrapper mobile={sidebar}>
      <Header
        left={
          <ChatItem
            avatar={currentUser?.photoURL}
            name={currentUser?.displayName}
          />
        }
        right={<>
          {/* <Button onClick={() => dispatch(toggleTheme())}>ST</Button> */}
          <ThemeSwitch />
          <Tooltip title='Wyloguj'>
            <IconButton onClick={handleLogOut}>
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </>
        }
      />
      <SidebarBody />
      <BottomButtons />
    </Wrapper>
  );
};

export default Sidebar;

