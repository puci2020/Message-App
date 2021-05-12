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
import { Link } from 'react-router-dom';
import Input from './Input';
import { actionTypes } from '../services/reducer';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.35;
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
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);

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

    const logOut = () => {
        auth.signOut()
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: null,
                });
                alert(`Wylogowano pomyślnie!`);
            })
            .catch((error) => alert(error));
    };

    return (
        <Wrapper>
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
                            <ChatIcon />
                        </IconButton>
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
            <Chats>
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
                            info={'Ostatnia wiadomość...'}
                        />
                    </Link>
                ))}
            </Chats>
        </Wrapper>
    );
};

export default Sidebar;
