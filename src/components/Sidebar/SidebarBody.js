import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { SearchOutlined } from '@material-ui/icons';
import toggleSidebar from 'state/actions/sidebarActions';
import { useAuth } from 'services/AuthProvider';
import db from 'services/Firebase';
import { actionTypes } from 'services/reducer';
import { useStateValue } from 'services/StateProvider';
import Input from 'components/Input';
import Loader from 'components/Loader';
// import ChatItem from './ChatItem';

const ChatItem = React.lazy(() => import('components/ChatItem'));

const Wrapper = styled.div`
  height: 100%;
`;

const Chats = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;

  .is-active > div {

    background-color: ${({ theme }) => theme.colors.menu.isActive};

  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 70px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .inputField {
    display: flex;
    align-items: center;
    //background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    padding-left: 10px;
    background-color: ${({ theme }) => theme.colors.secondary};

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
          })),
        );
        setFilteredRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
  }, []);

  useEffect(() => {
    if (filter.length > 0)
      setFilteredRooms(
        rooms.filter((el) =>
          el.data.name.toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    else setFilteredRooms(rooms);
  }, [filter]);

  return (
    <Wrapper>
      <Search>
        <Input icon={<SearchOutlined />}>
          <input
            type='text'
            placeholder='Wyszukaj czat'
            onChange={(e) => setFilter(e.target.value)}
          />
        </Input>
      </Search>
      <Suspense fallback={<Loader />}>
        <Chats onClick={() => dispatch(toggleSidebar())}>
          {/* <ChatItem newChat */}
          {/*          chat */}
          {/*          user={currentUser.uid} /> */}
          {filteredRooms.map((room) => (
            <NavLink
              key={room.id}
              to={`/room/${room.id}`}
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              activeClassName='is-active'
            >
              <ChatItem
                chat
                id={room.id}
                name={room.data.name}
                info={room.data.lastMessage}
                avatar={room.data.photoURL}
                className='is-active'
              />
            </NavLink>
          ))}
        </Chats>
      </Suspense>
    </Wrapper>
  );
};

export default SidebarBody;
