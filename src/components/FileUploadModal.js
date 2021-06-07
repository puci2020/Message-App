import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import firebase from 'firebase';
import alertify from 'alertifyjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../services/AuthProvider';
import db, { storage } from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import Input from './Input';

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
      'Można przesłać wyłącznie pliki PNG i PDF',
      (value) =>
        (value && value[0].type === 'image/png') ||
        (value && value[0].type === 'image/jpeg') ||
        (value && value[0].type === 'image/jpg') ||
        (value && value[0].type === 'application/pdf')
    )
    .required('Wybierz plik z urządzenia'),
});

// eslint-disable-next-line react/prop-types
const FileUploadModal = ({ id }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
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
      type: actionTypes.SET_FILE_UPLOAD,
      fileUpload: false,
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
          db.collection('rooms').doc(id).collection('messages').add({
            message: url,
            name: currentUser?.displayName,
            type: data.uploadFile[0].type,
            fileName: data.uploadFile[0].name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          db.collection('rooms').doc(id).update({
            lastMessage: 'Plik...',
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          });
          reset();
          handleClose();
          alertify.success('Plik wysłano');
        });
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={fileUpload}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={fileUpload}>
        <div className={classes.paper}>
          <h3 id="transition-modal-title" className={classes.text}>
            Wyślij załącznik
          </h3>
          <p id="transition-modal-description" className={classes.text}>
            Wybierz plik z urządzenia, który chcesz wysłać
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

            {/* <Button
              style={{
                marginTop: '10px',
              }}
              color="primary"
              variant="contained"
              type="button"
              onClick={reset()}
            >
              Reset
            </Button> */}
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default FileUploadModal;
