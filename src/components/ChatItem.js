import { Avatar } from '@material-ui/core';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import firebase from '../../node_modules/firebase';
import db from '../services/Firebase';

const Wrapper = styled.div`
  width: ${(props) => (props.chat ? '100%' : '80%')};
  height: ${(props) => (props.chat ? '70px' : 'auto')};
  border-bottom: ${(props) => (props.chat ? '1px solid #f6f6f6' : '')};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}; */
  display: flex;
  align-items: center;
  padding: ${(props) => (props.chat ? '10px 20px' : '')};
  /* position: ${(props) => (props.chat ? 'static' : 'relative')}; */
  /* top: ${(props) => (props.chat ? '' : '0')}; */
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.chat ? '#f6f6f6' : '')};
    cursor: ${(props) => (props.chat ? 'pointer' : 'default')};
    /* background-color: ${({ theme }) => theme.colors.secondary}; */
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  p {
    color: ${(props) => (props.chat ? 'black' : 'gray')};
  }
`;
// id w props
const ChatItem = ({ newChat, chat, avatar, name, info }) => {
  const createNewChat = () => {
    // const roomName = prompt('Podaj nazwę czatu!');
    alertify.prompt(
      'Nowy czat',
      'Podaj nazwę czatu',
      'Nazwa czatu',
      (evt, value) => {
        if (value) {
          db.collection('rooms').add({
            name: value,
            lastMessage: null,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          });

          alertify.success(`Czat o nazwie "${value}" utworzony pomyślnie!`);
        } else {
          alertify.warning(`Nazwa czatu nie może być pusta!`);
        }
      },
      () => {
        alertify.error('Tworzenie czatu anulowano');
      }
    );

    // console.log(roomName2);

    // if (roomName) {
    //     db.collection('rooms').add({
    //         name: roomName,
    //     });
    // }
  };

  return !newChat ? (
    <Wrapper chat={chat}>
      <Avatar src={avatar} />
      <Info>
        <h3>{name}</h3>
        <p>{info}</p>
      </Info>
    </Wrapper>
  ) : (
    <Wrapper chat={chat} onClick={createNewChat}>
      <h3>Stwórz czat</h3>
    </Wrapper>
  );
};

export default ChatItem;

ChatItem.defaultProps = {
  newChat: false,
  chat: false,
  avatar: null,
  name: null,
  info: null,
};

ChatItem.propTypes = {
  newChat: PropTypes.bool,
  chat: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  info: PropTypes.string,
};
