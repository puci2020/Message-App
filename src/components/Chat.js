import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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

const Wrapper = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet} {
    flex: 1;
  }
  /* overflow: hidden; */
  /* background-color: blue; */
`;

const Body = styled.div`
  /* background-color: darkgray; */
  background-image: url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  /* height: auto; */
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  /* position: relative;
  display: flex;
  flex-direction: column; */
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

// const Footer = styled.div``;

const Chat = () => {
  const { id } = useParams();
  const [roomName, setRoomName] = useState('');
  const [lastSeen, setLastSeen] = useState(null);
  const [messages, setMessages] = useState([]);
  // const [messageId, setMessageId] = useState([]);
  const messageEnd = useRef(null);

  const [{ sidebar }, dispatch] = useStateValue();
  const { currentUser } = useAuth();
  const user = currentUser;
  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .onSnapshot((snapschot) => {
          setRoomName(snapschot.data().name);
          // console.log(snapschot.data());
          setLastSeen(
            snapschot.data().lastSeen
            // `${dateToString(
            //     snapschot.data().lastSeen,
            // )} ${timeToString(snapschot.data().lastSeen)}`,
          );
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
          scrollToBottom();
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
    <Container>
      <Sidebar />
      <Wrapper>
        {/* {isNewUser} */}
        <Header
          left={
            <ChatItem
              name={roomName}
              info={
                roomName
                  ? displayRoomInfo(lastSeen)
                  : 'Wybierz czat z menu aby rozmawiać'
              }
            />
          }
          right={
            <>
              <IconButton>
                <SettingsIcon />
              </IconButton>
              <IconButton id="menuButton" onClick={showHideSidebar}>
                {sidebar ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </>
          }
        />
        <Body>
          {messages.map((message) => (
            <Message
              id={message.messageId}
              roomId={id}
              own={message.data.name === user?.displayName}
              user={
                message.data.name === user?.displayName ? '' : message.data.name
              }
              date={message.data.timestamp}
              text={message.data.message}
              key={message.data.timestamp}
            />
          ))}
          <div ref={messageEnd} />
        </Body>
        {roomName ? <MessageForm id={id} /> : ''}
      </Wrapper>
    </Container>
  );
};

export default Chat;
