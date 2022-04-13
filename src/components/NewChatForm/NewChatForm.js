import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import ChatIcon from '@material-ui/icons/Chat';
import alertify from 'alertifyjs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import db, { auth } from '../../services/Firebase';
import Input from '../Input';
import { useAuth } from '../../services/AuthProvider';
import toggleUpdateUserData from '../../state/actions/updateUserDataActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginBottom: '10px',
    color: '#d7d7d7',
  },
}));

const chatNameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nazwa jest wymagana'),
});

const NewChatForm = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(chatNameSchema) });

  const handleCreate = async (data) => {
    await
      db.collection('rooms').add({
        name: data.name,
        lastMessage: null,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: null,
        user: currentUser.uid.toString(),
      })
        .then(() => {
          alertify.success(`Czat o nazwie "${data.name}" utworzony pomyślnie!`);
          reset();
          dispatch(toggleUpdateUserData());
        })
        .catch((error) => {
          alertify.alert(`Dodawanie nowego czatu`, error.message);
        });
  };
  return (
    <div>
      <h3 id='transition-modal-title'
          className={classes.text}>
        Utwóz nowy czat
      </h3>
      <p id='transition-modal-description'
         className={classes.text}>
        Podaj nazwę czatu
      </p>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Input icon={<ChatIcon />}
               error={errors.name?.message}>
          <input type='text'
                 placeholder='Nazwa czatu' {...register('name')} />
        </Input>
        <Button
          style={{
            marginTop: '10px',
          }}
          color='primary'
          variant='contained'
          type='submit'
        >
          Utwórz czat
        </Button>
      </form>
    </div>
  );
};

export default NewChatForm;

