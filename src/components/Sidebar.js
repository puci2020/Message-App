import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ExitToApp, SearchOutlined } from '@material-ui/icons';
import ChatItem from './ChatItem';
import Header from './Header';
import db, { auth } from '../services/Firebase';
import { useStateValue } from '../services/StateProvider';
import { Link, useHistory } from 'react-router-dom';
import Input from './Input';
import { actionTypes } from '../services/reducer';
import alertify from 'alertifyjs';

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
    const [{ user, sidebar }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })),
            ),
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

    const logOut = () => {
        auth.signOut()
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: null,
                });
                localStorage.setItem('user', null);
                history.push('/');
                alertify.success(`Wylogowano pomyślnie!`);
            })
            .catch((error) => alertify.alert('Błąd', error.message));
    };

    return (
        <Wrapper mobile={sidebar}>
            <Header
                left={
                    <ChatItem
                        avatar={user?.photoURL}
                        name={user?.displayName}
                    />
                }
                right={
                    <>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                        <IconButton onClick={logOut}>
                            <ExitToApp />
                        </IconButton>
                    </>
                }
            />
            <Search>
                {/* <div className='inputField'>
                    <SearchOutlined />
                    <input type='text' placeholder='Wyszukaj czat!' />
                </div> */}
                <Input
                    icon={<SearchOutlined />}
                    type={'text'}
                    placeholder={'Wyszukaj czat!'}
                />
            </Search>
            <Chats onClick={showHideSidebar}>
                <ChatItem newChat chat />
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
                        />
                    </Link>
                ))}
            </Chats>
        </Wrapper>
    );
};

export default Sidebar;
