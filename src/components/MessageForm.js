import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import SendIcon from '@material-ui/icons/Send';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  padding: 10px 20px;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  input {
    padding-left: 10px;
    border: none;
    outline: none;
    margin-left: 10px;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    /* padding-left: 10px; */
  }
`;

const MessageForm = ({ id }) => {
  const [message, setMessage] = useState('');
  //   const [{ user }] = useStateValue();

  const { currentUser } = useAuth();
  const user = currentUser;

  const getCountString = (text) => text.length;

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(id).collection('messages').add({
      message,
      name: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    db.collection('rooms')
      .doc(id)
      .update({
        lastMessage:
          getCountString(message) > 29
            ? `${message.substring(0, 30)}...`
            : message,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setMessage('');
  };

  return (
    <Wrapper>
      <form>
        <IconButton>
          <MicNoneIcon />
        </IconButton>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napisz wiadomość"
        />
        <IconButton>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <IconButton type="submit" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </form>
    </Wrapper>
  );
};

export default MessageForm;

MessageForm.propTypes = {
  id: PropTypes.string.isRequired,
};
