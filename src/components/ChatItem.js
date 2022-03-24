import { Avatar } from '@material-ui/core';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from '../../node_modules/firebase';
import db from '../services/Firebase';

const Wrapper = styled.div`
  width: ${(props) => (props.chat ? '100%' : '70%')};
    //max-width: ${(props) => (props.chat ? '100%' : '140px')};
  height: ${(props) => (props.chat ? '70px' : 'auto')};
  border-bottom: 1px solid ${(props) => (props.chat ? props.theme.colors.border : 'none')};
    //border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}; 
  display: flex;
  align-items: center;
  padding: ${(props) => (props.chat ? '10px 20px' : '')};
  cursor: pointer;
  background-color: ${(props) => (props.chat ? props.theme.colors.primary : '')};;

  &:hover {
      //background-color: ${(props) => (props.chat ? '#f6f6f6' : '')};
    background-color: ${(props) => (props.chat ? props.theme.colors.secondary : '')};
    cursor: ${(props) => (props.chat ? 'pointer' : 'default')};

      /* background-color: ${({ theme }) => theme.colors.secondary}; */
  }

  // &:active {
    //   background-color: ${(props) => (props.chat ? props.theme.colors.secondary : '')};
  // }

  .addButton {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  p {
    color: ${(props) => (props.chat ? props.theme.colors.font.primary : props.theme.colors.font.primary)};
  }

  h3 {
    color: ${(props) => (props.chat ? props.theme.colors.font.primary : '')};
  }
`;
// id w props
const ChatItem = ({ newChat, chat, avatar, name, info, user }) =>

  // const createNewChat = async () => {
  //   // const roomName = prompt('Podaj nazwę czatu!');
  //   await alertify.prompt(
  //     'Nowy czat',
  //     'Podaj nazwę czatu',
  //     'Nazwa czatu',
  //     (evt, value) => {
  //       if (value) {
  //         db.collection('rooms').add({
  //           name: value,
  //           lastMessage: null,
  //           lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
  //           photoURL: null,
  //           user: user.toString(),
  //         });
  //         alertify.success(`Czat o nazwie "${value}" utworzony pomyślnie!`);
  //       } else {
  //         alertify.warning(`Nazwa czatu nie może być pusta!`);
  //       }
  //     },
  //     () => {
  //       alertify.error('Tworzenie czatu anulowano');
  //     },
  //   );
  // };
  !newChat ? (
    <Wrapper chat={chat}>
      <Avatar src={avatar}
              alt={name}
              sx={{ width: 40, height: 40 }} />
      <Info chat={chat}>
        <h3>{name}</h3>
        <p>{info}</p>
      </Info>
    </Wrapper>
  ) : (

    <Wrapper chat={chat}>
      <div className='addButton'>
        <AddCircleIcon fontSize='large'
                       color='action' />
      </div>
      <h3>Stwórz czat</h3>
    </Wrapper>
  )
;
export default ChatItem;

ChatItem.defaultProps = {
  newChat: false,
  chat: false,
  avatar: null,
  name: null,
  info: null,
  user: null,
};
ChatItem.propTypes = {
  newChat: PropTypes.bool,
  chat: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  info: PropTypes.string,
  user: PropTypes.string,
};
