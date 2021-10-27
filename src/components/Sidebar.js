import { Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, ExitToApp, SearchOutlined } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import alertify from 'alertifyjs';
// eslint-disable-next-line import/no-unresolved
import db from '../services/Firebase';
import firebase from '../../node_modules/firebase';
import toggleSidebar from '../state/actions/sidebarActions';
import { useAuth } from '../services/AuthProvider';
import { useStateValue } from '../services/StateProvider';
// import ChatItem from './ChatItem';
// import Header from './Header';
// import Input from './Input';
// import SidebarBody from './SidebarBody';

const ChatItem = React.lazy(() => import('./ChatItem'));
const Header = React.lazy(() => import('./Header'));
const Input = React.lazy(() => import('./Input'));
const SidebarBody = React.lazy(() => import('./SidebarBody'));

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

const BottomButtons = styled.div`
  height: 75px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: space-evenly;
  align-items: center;


  Button {
    width: 45%;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.font.primary};
    font-size: ${({ theme }) => theme.font.size.xxs};


    &:hover {
      background-color: ${({ theme }) => theme.colors.menu.hoverLink};

    }

    svg {
      margin-right: 10px;
    }
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 90px;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  overflow: hidden;

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    height: 100%;
  }

  .inputField {
    display: flex;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    padding-left: 10px;

    svg {
      color: gray;
    }
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

  const createNewChat = async () => {
    // const roomName = prompt('Podaj nazwę czatu!');
    await alertify.prompt(
      'Nowy czat',
      'Podaj nazwę czatu',
      'Nazwa czatu',
      (evt, value) => {
        if (value) {
          db.collection('rooms').add({
            name: value,
            lastMessage: null,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: null,
            user: currentUser.uid.toString(),
          });
          alertify.success(`Czat o nazwie "${value}" utworzony pomyślnie!`);
        } else {
          alertify.warning(`Nazwa czatu nie może być pusta!`);
        }
      },
      () => {
        alertify.error('Tworzenie czatu anulowano');
      },
    );
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
        right={
          <>
            {/* <Link to={`/settings/user/${currentUser.uid}`}> */}
            {/*  <Tooltip */}
            {/*    title='Ustawienia konta' */}
            {/*    onClick={() => dispatch(toggleSidebar())} */}
            {/*  > */}
            {/*    <IconButton> */}
            {/*      <SettingsIcon /> */}
            {/*    </IconButton> */}
            {/*  </Tooltip> */}
            {/* </Link> */}
            <Tooltip title='Wyloguj'>
              <IconButton onClick={handleLogOut}>
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <SidebarBody />
      <BottomButtons>
        <Tooltip
          title='Stwórz nowy czat'
        >
          <Button onClick={() => {
            dispatch(toggleSidebar());
            createNewChat();
          }}>
            <AddCircle />
            Nowy czat</Button></Tooltip>
        <Tooltip
          title='Ustawienia konta'
        >
          <Button onClick={() => {
            dispatch(toggleSidebar());
            history.push(`/settings/user/${currentUser.uid}`);
          }}>
            <SettingsIcon />Ustawienia</Button></Tooltip>
      </BottomButtons>
    </Wrapper>
  );
};

export default Sidebar;

// "eslint": "^7.27.0",
// "eslint-config-airbnb": "^18.2.1",
// "eslint-config-prettier": "^8.3.0",
// "eslint-config-react": "^1.1.7",
// "eslint-plugin-import": "^2.23.3",
// "eslint-plugin-jsx-a11y": "^6.4.1",
// "eslint-plugin-prettier": "^3.4.0",
// "eslint-plugin-react": "^7.23.2",
// "eslint-plugin-react-hooks": "^1.7.0",
// "prettier": "^2.3.0"
