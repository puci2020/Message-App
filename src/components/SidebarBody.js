import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import toggleSidebar from '../actions/sidebarActions';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
// import ChatItem from './ChatItem';

const ChatItem = React.lazy(() => import('./ChatItem'));

const Chats = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;
`;

const SidebarBody = () => {
  const [rooms, setRooms] = useState([]);
  // const [{ sidebar }, dispatch] = useStateValue();
  // const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(async () => {
    await db
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
  }, []);

  // const showHideSidebar = () => {
  //   dispatch({
  //     type: actionTypes.SET_SIDEBAR,
  //     sidebar: !sidebar,
  //   });
  // };

  return (
    <Chats onClick={() => dispatch(toggleSidebar())}>
      <ChatItem newChat chat user={currentUser.uid} />
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
  );
};

export default SidebarBody;
