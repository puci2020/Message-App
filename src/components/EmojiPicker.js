import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@material-ui/icons';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import firebase from 'firebase';
import alertify from 'alertifyjs';
import { yupResolver } from '@hookform/resolvers/yup';
import Picker from 'emoji-picker-react';
import styled from 'styled-components';
import { useAuth } from '../services/AuthProvider';
import db, { storage } from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';

const Div = styled.div`
  .emoji {
    overflow: hidden;
  }
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '90vw',
    backgroundColor: `#ededed`,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    marginBottom: '10px',
  },
}));

const EmojiPicker = ({ id }) => {
  const classes = useStyles();
  const [{ emojiPicker, message, loader }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_LOADER,
      loader: false,
    });
    console.log('tereaz');
  }, []);

  const handleClose = () => {
    dispatch({
      type: actionTypes.SET_EMOJI_PICKER,
      emojiPicker: false,
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    dispatch({
      type: actionTypes.SET_MESSAGE,
      message: message + emojiObject.emoji,
    });
  };

  const handleUpload = (data) => {};

  return (
    <div>
      {loader ? null : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={emojiPicker}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={emojiPicker}>
            <Div className={classes.paper}>
              <Picker onEmojiClick={onEmojiClick} disableAutoFocus />
            </Div>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default EmojiPicker;

EmojiPicker.defaultProps = {
  id: null,
};

EmojiPicker.propTypes = {
  id: PropTypes.string,
};
