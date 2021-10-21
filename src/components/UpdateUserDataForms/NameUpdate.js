import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@material-ui/icons/Person';
import alertify from 'alertifyjs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import { useAuth } from '../../services/AuthProvider';
import toggleUpdateUserData from '../../actions/updateUserDataActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginBottom: '10px',
  },
}));

const nameUpdateSchema = yup.object().shape({
  displayName: yup
    .string()
    .required('Nazwa jest wymagana')
    .min(4, 'Nazwa musi składać się z miniumum 4 znaków'),
});

const NameUpdate = () => {
  const classes = useStyles();
  const { currentUser, createUser } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(nameUpdateSchema) });

  const handleUpdate = async (data) => {
    await currentUser
      .updateProfile({
        displayName: data.displayName,
      })
      .then(() => {
        createUser(currentUser.uid, data.displayName);
        alertify.success(`Nazwa użytkownika zmieniona`);
        reset();
        dispatch(toggleUpdateUserData());
      })
      .catch((error) => {
        alertify.alert(`Zmiana nazwy użytkownika`, error.message);
      });
  };
  return (
    <div>
      <h3 id="transition-modal-title" className={classes.text}>
        Zmiana nazwy użytkownika
      </h3>
      <p id="transition-modal-description" className={classes.text}>
        Podaj nową nazwę użytkownika
      </p>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Input icon={<PersonIcon />} error={errors.displayName?.message}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            {...register('displayName')}
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
          Aktualizuj konto
        </Button>
      </form>
    </div>
  );
};

export default NameUpdate;
