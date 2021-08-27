import { IconButton, Tooltip } from '@material-ui/core';
import { ExitToApp, SearchOutlined } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import alertify from 'alertifyjs';
import React, { useEffect, useState } from 'react';
import { Link, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../services/AuthProvider';
import db, { auth } from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import ChatItem from './ChatItem';
import Header from './Header';
import Input from './Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;
  background-color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.media.tablet} {
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    transform: ${(props) =>
      props.mobile ? 'translateX(0)' : 'translateX(-120%)'};
    transition: transform 0.35s ease-in-out;
    z-index: 2;
    width: 70%;
    height: 80vh;
    max-width: 400px;
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

const Chats = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;
`;

const Sidebar = () => {
  const [{ sidebar }, dispatch] = useStateValue();
  const { currentUser, logOut } = useAuth();
  const user = currentUser;
  const [rooms, setRooms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .orderBy('lastSeen', 'desc')
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return () => {
      unsubscribe();
    };
  }, []);

  const showHideSidebar = () => {
    dispatch({
      type: actionTypes.SET_SIDEBAR,
      sidebar: !sidebar,
    });
  };
  const handleLogOut = async () => {
    await logOut();
    history.push('/login');
  };

  return (
    <Wrapper mobile={sidebar}>
      <Header
        left={<ChatItem avatar={user?.photoURL} name={user?.displayName} />}
        right={
          <>
            <Link to={`/settings/user/${user.uid}`}>
              <Tooltip title="Ustawienia konta">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Wyloguj">
              <IconButton onClick={handleLogOut}>
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Search>
        {/* <div className='inputField'>
                    <SearchOutlined />
                    <input type='text' placeholder='Wyszukaj czat!' />
                </div> */}
        <Input icon={<SearchOutlined />}>
          <input type="text" placeholder="Wyszukaj czat" />
        </Input>
      </Search>
      <Chats onClick={showHideSidebar}>
        <ChatItem newChat chat user={user.uid} />
        {rooms.map((room) => (
          <Link
            key={room.id}
            to={`/room/${room.id}`}
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <ChatItem
              chat
              id={room.id}
              name={room.data.name}
              info={room.data.lastMessage}
              avatar={room.data.photoURL}
            />
          </Link>
        ))}
      </Chats>
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
