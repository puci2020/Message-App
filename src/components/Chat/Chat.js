import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import toggleSidebar from '../../state/actions/sidebarActions';
import { useAuth } from '../../services/AuthProvider';
import db from '../../services/Firebase';
import { actionTypes } from '../../services/reducer';
import { useStateValue } from '../../services/StateProvider';
import { showFullDate } from '../../utils/Date';
// import ChatItem from '../ChatItem';
// import Header from '../Header';
// import MessageForm from '../MessageForm/MessageForm';
// import ChatBody from './ChatBody';

const ChatBody = React.lazy(() => import('./ChatBody'));
const MessageForm = React.lazy(() => import('../MessageForm/MessageForm'));
const Header = React.lazy(() => import('../Header'));
const ChatItem = React.lazy(() => import('../ChatItem'));

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
  const { currentUser } = useAuth();
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = true;
    // candel in first if
    if (id && cancel) {
      db.collection('rooms')
        .doc(id)
        .onSnapshot((snapschot) => {
          if (cancel) setRoomData(snapschot.data());
        });
    }
    return () => {
      cancel = false;
    };
  }, [id]);

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
                <Tooltip title='Ustawienia czatu'>
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : null}
            <Tooltip title={sidebar ? 'Schowaj menu' : 'Pokaż menu'}>
              <IconButton
                id='menuButton'
                onClick={() => dispatch(toggleSidebar())}
              >
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
