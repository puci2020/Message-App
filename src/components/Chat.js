import { IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import { showFullDate } from '../utils/Date';
import ChatItem from './ChatItem';
import Header from './Header';
import Message from './Message';
import MessageForm from './MessageForm';
import Sidebar from './Sidebar';
import Loader from './Loader';

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

const Body = styled.div`
  background-image: url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  min-height: 100%;
  max-width: 100vw;
`;

const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 90vh;
  width: 90vw;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
  ${({ theme }) => theme.media.tablet} {
    height: 80vh;
  }
`;

const Chat = () => {
  const { id } = useParams();
  const [roomName, setRoomName] = useState('');
  const [lastSeen, setLastSeen] = useState(null);
  const [roomPhoto, setRoomPhoto] = useState();
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);

  const [{ sidebar, loader }, dispatch] = useStateValue();
  const { currentUser } = useAuth();
  // const user = currentUser;

  useEffect(() => {
    if (id) {
      dispatch({
        type: actionTypes.SET_LOADER,
        loader: true,
      });

      db.collection('rooms')
        .doc(id)
        .onSnapshot((snapschot) => {
          setRoomName(snapschot.data().name);
          setLastSeen(snapschot.data().lastSeen);
          setRoomPhoto(snapschot.data().photoURL);
          setUser(snapschot.data().user);
        });

      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              messageId: doc.id,
              data: doc.data(),
            }))
          );
          setTimeout(
            () =>
              dispatch({
                type: actionTypes.SET_LOADER,
                loader: false,
              }),
            1000
          );
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
            name={roomName}
            info={
              roomName
                ? displayRoomInfo(lastSeen)
                : 'Wybierz czat z menu aby rozmawiać'
            }
            avatar={roomPhoto}
          />
        }
        right={
          <>
            {roomName && user === currentUser.uid ? (
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

      <ScrollToBottom className="scroll">
        {loader ? (
          <Loader />
        ) : (
          <Body>
            {messages.map((message) => (
              <Message
                id={message.messageId}
                roomId={id}
                own={message.data.user === currentUser?.uid}
                user={
                  message.data.user === currentUser?.uid
                    ? null
                    : message.data.user
                }
                date={message.data.timestamp}
                text={message.data.message}
                type={message.data.type}
                fileName={message.data.fileName}
                key={message.data.timestamp}
              />
            ))}
          </Body>
        )}
      </ScrollToBottom>

      {roomName ? <MessageForm id={id} /> : ''}
    </Wrapper>
  );
};

export default Chat;
