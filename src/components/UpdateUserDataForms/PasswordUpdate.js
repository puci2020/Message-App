import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Lock } from '@material-ui/icons';
import alertify from 'alertifyjs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import db, { auth } from '../../services/Firebase';
import Input from '../Input';
import { useAuth } from '../../services/AuthProvider';

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

const emailUpdateSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail jest wymagany')
    .email('Podany adres jest niepoprawny'),
  password: yup
    .string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi zawierać przynajmniej 8 znaków'),

  newPassword: yup
    .string()
    .required('Nowe hasło jest wymagane')
    .min(8, 'Hasło musi zawierać przynajmniej 8 znaków'),
  newPasswordConfirm: yup
    .string()
    .required('Potwierdź nowe hasło')
    .min(8, 'Hasło musi zawierać przynajmniej 8 znaków')
    .oneOf([yup.ref('newPassword'), null], 'Hasła muszą być takie same'),
});

const PasswordUpdate = () => {
  const classes = useStyles();
  const { currentUser, signInWithEmail } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(emailUpdateSchema) });

  const update = async (newPassword) => {
    try {
      await currentUser.updatePassword(newPassword);
      reset();
      alertify.success('Zaktualizowano pomyślnie');
    } catch (error) {
      alertify.alert(`Błąd`, error.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
      update(data.newPassword);
    } catch (error) {
      alertify.alert(`Błąd`, error.message);
    }
  };
  return (
    <div>
      <h3 id="transition-modal-title" className={classes.text}>
        Zmiana hasła
      </h3>
      <p id="transition-modal-description" className={classes.text}>
        Podaj obecne dane oraz nowe hasło
      </p>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Input icon={<Email />} error={errors.email?.message}>
          <input type="text" placeholder="E-mail" {...register('email')} />
        </Input>
        <Input icon={<Lock />} error={errors.password?.message}>
          <input
            type="password"
            placeholder="Stere hasło"
            {...register('password')}
          />
        </Input>
        <Input icon={<Lock />} error={errors.newPassword?.message}>
          <input
            type="password"
            placeholder="Nowe hasło"
            {...register('newPassword')}
          />
        </Input>
        <Input icon={<Lock />} error={errors.newPasswordConfirm?.message}>
          <input
            type="password"
            placeholder="Potwierdź nowe hasło"
            {...register('newPasswordConfirm')}
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
          Zemiń hasło
        </Button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
