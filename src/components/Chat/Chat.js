import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../services/AuthProvider';
import db from '../../services/Firebase';
import { actionTypes } from '../../services/reducer';
import { useStateValue } from '../../services/StateProvider';
import { showFullDate } from '../../utils/Date';
import ChatItem from '../ChatItem';
import Header from '../Header';
import Message from './Message';
import MessageForm from '../MessageForm/MessageForm';
import ChatBody from './ChatBody';

const Wrapper = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
  height: 100%;

  .scroll {
    height: 100%;
  }

  ${({ theme }) => theme.media.tablet} {
    flex: 1;
  }
`;

const Chat = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [{ sidebar, loader }, dispatch] = useStateValue();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .onSnapshot((snapschot) => {
          setRoomData(snapschot.data());
        });
    }
  }, [id]);

  const showHideSidebar = () => {
    dispatch({
      type: actionTypes.SET_SIDEBAR,
      sidebar: !sidebar,
    });
  };

  const displayRoomInfo = (date) => {
    if (showFullDate(date).length > 1) {
      return `Ostatnia aktywność: ${showFullDate(date)}`;
    }
    return 'Aktywny teraz';
  };

  return (
    <Wrapper>
      <Header
        left={
          <ChatItem
            name={roomData.name}
            info={
              roomData.name
                ? displayRoomInfo(roomData.lastSeen)
                : 'Wybierz czat z menu aby rozmawiać'
            }
            avatar={roomData.photoURL}
          />
        }
        right={
          <>
            {roomData.name && roomData.user === currentUser.uid ? (
              <Link to={`/settings/room/${id}`}>
                <Tooltip title="Ustawienia czatu">
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : null}

            <Tooltip title={sidebar ? 'Schowaj menu' : 'Pokaż menu'}>
              <IconButton id="menuButton" onClick={showHideSidebar}>
                {sidebar ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <ChatBody id={id} />

      {roomData.name ? <MessageForm id={id} /> : ''}
    </Wrapper>
  );
};

export default Chat;