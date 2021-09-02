import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import ChatItem from './ChatItem';

const Chats = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;
`;

const SidebarBody = () => {
  const [rooms, setRooms] = useState([]);
  const [{ sidebar }, dispatch] = useStateValue();
  const { currentUser } = useAuth();

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

    return async () => {
      await unsubscribe();
    };
  }, []);

  const showHideSidebar = () => {
    dispatch({
      type: actionTypes.SET_SIDEBAR,
      sidebar: !sidebar,
    });
  };

  return (
    <Chats onClick={showHideSidebar}>
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
