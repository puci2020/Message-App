import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SearchOutlined } from '@material-ui/icons';
import toggleSidebar from '../state/actions/sidebarActions';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import Input from './Input';
import Loader from './Loader';
// import ChatItem from './ChatItem';

const ChatItem = React.lazy(() => import('./ChatItem'));

const Chats = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;
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

const SidebarBody = () => {
  const [rooms, setRooms] = useState([]);
  // const [{ sidebar }, dispatch] = useStateValue();
  // const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const { currentUser } = useAuth();

  useEffect(async () => {
    await db
      .collection('rooms')
      .orderBy('lastSeen', 'desc')
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setFilteredRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    if (filter.length > 0)
      setFilteredRooms(
        rooms.filter((el) =>
          el.data.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    else setFilteredRooms(rooms);
  }, [filter]);

  return (
    <>
      <Search>
        <Input icon={<SearchOutlined />}>
          <input
            type="text"
            placeholder="Wyszukaj czat"
            onChange={(e) => setFilter(e.target.value)}
          />
        </Input>
      </Search>
      <Suspense fallback={<Loader />}>
        <Chats onClick={() => dispatch(toggleSidebar())}>
          <ChatItem newChat chat user={currentUser.uid} />
          {filteredRooms.map((room) => (
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
      </Suspense>
    </>
  );
};

export default SidebarBody;
