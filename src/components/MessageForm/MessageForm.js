import { IconButton, Tooltip } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../services/AuthProvider';
import db from '../../services/Firebase';
import { actionTypes } from '../../services/reducer';
import { useStateValue } from '../../services/StateProvider';

const EmojiPicker = lazy(() => import('./EmojiPicker'));
const SpeechToText = lazy(() => import('./SpeechToText'));
const FileUploadModal = lazy(() => import('./FileUploadModal'));

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
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
    margin: 0 10px;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    /* padding-left: 10px; */
  }
`;

const MessageForm = ({ id }) => {
  const [{ message, fileUpload, emojiPicker }, dispatch] = useStateValue();
  const { currentUser } = useAuth();

  const getCountString = (text) => text.length;

  const setMessage = (data) => {
    dispatch({
      type: actionTypes.SET_MESSAGE,
      message: data,
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await db.collection('rooms').doc(id).collection('messages').add({
      message,
      user: currentUser?.uid,
      type: 'text',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await db
      .collection('rooms')
      .doc(id)
      .update({
        lastMessage:
          getCountString(message) > 29
            ? `${message.substring(0, 30)}...`
            : message,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      });
    await setMessage('');
  };

  const openFileUpload = async () => {
    await dispatch({
      type: actionTypes.SET_FILE_UPLOAD,
      fileUpload: true,
    });
  };

  const openEmojiPicker = async () => {
    await dispatch({
      type: actionTypes.SET_EMOJI_PICKER,
      emojiPicker: true,
    });
  };

  return (
    <Wrapper>
      <form>
        <SpeechToText />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napisz wiadomość"
        />
        <Tooltip title="Dodaj załącznik">
          <IconButton onClick={openFileUpload} onKeyDown={openFileUpload}>
            <AttachFile />
          </IconButton>
        </Tooltip>
        <Tooltip title="Wstaw emoji">
          <IconButton onClick={openEmojiPicker} onKeyDown={openEmojiPicker}>
            <SentimentVerySatisfiedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Wyślij">
          <IconButton type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Tooltip>
      </form>
      {fileUpload && <FileUploadModal id={id} />}
      {emojiPicker && <EmojiPicker />}
    </Wrapper>
  );
};

export default MessageForm;

MessageForm.propTypes = {
  id: PropTypes.string.isRequired,
};
