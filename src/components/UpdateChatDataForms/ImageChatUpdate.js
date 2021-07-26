import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import alertify from 'alertifyjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../services/AuthProvider';
import db, { storage } from '../../services/Firebase';
import { actionTypes } from '../../services/reducer';
import { useStateValue } from '../../services/StateProvider';
import Input from '../Input';

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

const schema = yup.object().shape({
  uploadFile: yup
    .mixed()

    .test(
      'fileSize',
      'Plik jest za duży',
      (value) => value && value[0].size <= 2000000
    )
    .test(
      'type',
      'Można przesłać wyłącznie pliki PNG, JPEG i JPG',
      (value) =>
        (value && value[0].type === 'image/png') ||
        (value && value[0].type === 'image/jpeg') ||
        (value && value[0].type === 'image/jpg')
    )
    .required('Wybierz plik z urządzenia'),
});

const ImageChatUpdate = ({ id }) => {
  const classes = useStyles();
  const [{ fileUpload }, dispatch] = useStateValue();
  const {
    register,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleClose = () => {
    dispatch({
      type: actionTypes.SET_UPDATE_USER_DATA,
      updateUserData: false,
    });
  };

  const handleUpload = (data) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(data.uploadFile[0].name);

    fileRef.put(data.uploadFile[0]).then(() => {
      storage
        .ref()
        .child(data.uploadFile[0].name)
        .getDownloadURL()
        .then((url) => {
          db.collection('rooms')
            .doc(id)
            .update({
              photoURL: url,
            })
            .then(() => {
              alertify.success('Zdjęcie przesłano pomyślnie!');
            })
            .catch((error) => {
              alertify.alert(`Błąd`, error.message);
            });
          reset();
          handleClose();
        });
    });
  };

  return (
    <div>
      <h3 id="transition-modal-title" className={classes.text}>
        Zmiana zdjęcia
      </h3>
      <p id="transition-modal-description" className={classes.text}>
        Wybierz plik z komputera
      </p>
      <form onSubmit={handleSubmit(handleUpload)}>
        <Input icon={<AttachFile />} error={errors.uploadFile?.message}>
          <input
            type="file"
            placeholder="Plik"
            // onChange={reset}
            {...register('uploadFile', { required: true })}
          />
        </Input>
        <Button
          style={{
            marginTop: '10px',
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Wyślij
        </Button>
      </form>
    </div>
  );
};

export default ImageChatUpdate;

ImageChatUpdate.defaultProps = {
  type: null,
  id: null,
};

ImageChatUpdate.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
};