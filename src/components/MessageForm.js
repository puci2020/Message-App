import { IconButton, Tooltip } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import MicNoneIcon from '@material-ui/icons/MicNone';
import SendIcon from '@material-ui/icons/Send';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import alertify from 'alertifyjs';
import useSpeechToText from 'react-hook-speech-to-text';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import FileUploadModal from './FileUploadModal';
import EmojiPicker from './EmojiPicker';

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
  // const [message, setMessage] = useState('');
  const [{ message, fileUpload, emojiPicker }, dispatch] = useStateValue();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    crossBrowser: true,
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    results.map((result) =>
      dispatch({
        type: actionTypes.SET_MESSAGE,
        message: message + result.transcript,
      })
    );
  }, [results]);

  const getCountString = (text) => text.length;

  const setMessage = (data) => {
    dispatch({
      type: actionTypes.SET_MESSAGE,
      message: data,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(id).collection('messages').add({
      message,
      user: currentUser?.uid,
      type: 'text',
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

  const openFileUpload = () => {
    dispatch({
      type: actionTypes.SET_FILE_UPLOAD,
      fileUpload: true,
    });
  };

  const openEmojiPicker = () => {
    dispatch({
      type: actionTypes.SET_EMOJI_PICKER,
      emojiPicker: true,
    });
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <Wrapper>
      <form>
        <IconButton
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          <MicNoneIcon />
        </IconButton>
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
