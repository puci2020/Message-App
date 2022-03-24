import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Picker from 'emoji-picker-react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../services/reducer';
import { useStateValue } from '../../services/StateProvider';
import toggleEmojiPicker from '../../state/actions/emojiPickerActions';
import { setMessage } from '../../state/actions/messageActions';

const Div = styled.div`

`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '90vw',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    marginBottom: '10px',
  },
}));

const Paper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  h3, p {
    color: ${({ theme }) => theme.colors.font.primary}
  }

  .emoji {
    overflow: hidden;
  }
`;

const EmojiPicker = () => {
  const classes = useStyles();
  // const [{ emojiPicker, message, loader }, dispatch] = useStateValue();
  const emojiPicker = useSelector((state) => state.emojiPicker);
  const message = useSelector((state) => state.message);
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  // const handleClose = () => {
  //   dispatch({
  //     type: actionTypes.SET_EMOJI_PICKER,
  //     emojiPicker: false,
  //   });
  // };

  const onEmojiClick = (event, emojiObject) => {
    // dispatch({
    //   type: actionTypes.SET_MESSAGE,
    //   message: message + emojiObject.emoji,
    // });
    dispatch(setMessage(message + emojiObject.emoji));
  };

  return (
    <div>
      {loader ? null : (
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={emojiPicker}
          onClose={() => dispatch(toggleEmojiPicker())}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={emojiPicker}>
            <Paper className={classes.paper}>
              <Picker onEmojiClick={onEmojiClick}
                      disableAutoFocus />
            </Paper>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default EmojiPicker;
