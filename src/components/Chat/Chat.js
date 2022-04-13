import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import toggleSidebar from 'state/actions/sidebarActions';
import { useAuth } from 'services/AuthProvider';
import { showFullDate } from 'utils/Date';
import ThemeSwitch from 'components/ThemeSwitch';
import toggleEmojiPicker from 'state/actions/emojiPickerActions';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SearchMessageForm from 'components/SearchMessagesForm/SearchMessagesForm';
import toggleSearchMessage from 'state/actions/searchMessageActions';
import { SearchOutlined } from '@material-ui/icons';
import { setRoom } from 'state/actions/roomActions';
import db from '../../services/Firebase';

const ChatBody = lazy(() => import('./ChatBody'));
const MessageForm = lazy(() => import('components/SendMessageForm/MessageForm/MessageForm'));
const Header = lazy(() => import('../Header'));
const ChatItem = lazy(() => import('../ChatItem'));

const Wrapper = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
  height: 100%;
  //position: relative;

  .scroll {
    height: 100%;
  }

  ${({ theme }) => theme.media.tablet} {
    flex: 1;
  }
`;

const Chat = () => {
  const { id } = useParams();
  // const [roomData, setRoomData] = useState([]);
  const { currentUser } = useAuth();
  const sidebar = useSelector((state) => state.sidebar);
  const room = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {

    let cancel = true;
    // candel in first if
    if (id && cancel) {
      db.collection('rooms')
        .doc(id)
        .onSnapshot((snapschot) => {
          if (cancel) dispatch(setRoom(snapschot.data()));
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
            name={room.name}
            info={
              room.name
                ? displayRoomInfo(room.lastSeen)
                : 'Wybierz czat z menu aby rozmawiać'
            }
            avatar={room.photoURL}
          />
        }
        right={
          <>
            {room.name ? (
              <Tooltip title='Wyszukaj w czacie'>
                <IconButton
                  onClick={() => dispatch(toggleSearchMessage())}
                  onKeyDown={() => dispatch(toggleSearchMessage())}
                >
                  <SearchOutlined />
                </IconButton>
              </Tooltip>
            ) : null}
            {room.name ?
              <Link to={`/settings/room/${id}`}>
                <Tooltip title='Ustawienia czatu'>
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              : null}
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
      <SearchMessageForm />
      <ChatBody id={id} />
      {room.name ? <MessageForm id={id} /> : ''}
    </Wrapper>
  );
};

export default Chat;
