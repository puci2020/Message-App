import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Email } from '@material-ui/icons';
import alertify from 'alertifyjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { auth } from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import Input from './Input';
import PasswordReset from './UpdateUserDataForms/PasswordReset';

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
}));

const UpdateUserDataModal = ({ type }) => {
  const classes = useStyles();
  const [{ updateUserData }, dispatch] = useStateValue();

  const handleClose = () => {
    dispatch({
      type: actionTypes.SET_UPDATE_USER_DATA,
      updateUserData: false,
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={updateUserData}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={updateUserData}>
        <div className={classes.paper}>
          {type === 'passwordReset' ? <PasswordReset /> : null}
        </div>
      </Fade>
    </Modal>
  );
};

export default UpdateUserDataModal;

UpdateUserDataModal.propTypes = {
  type: PropTypes.string.isRequired,
};
