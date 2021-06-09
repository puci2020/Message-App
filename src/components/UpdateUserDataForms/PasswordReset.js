import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Fade from '@material-ui/core/Fade';
import { Email } from '@material-ui/icons';
import alertify from 'alertifyjs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { auth } from '../../services/Firebase';
import Input from '../Input';
import { useStateValue } from '../../services/StateProvider';

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

const passwordResetSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail jest wymagany')
    .email('Podany adres jest niepoprawny'),
});

const PasswordReset = () => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordResetSchema) });

  const handleReset = (data) => {
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => {
        alertify.alert(`Reset hasła`, `Email został wysłany!`);
        reset();
      })
      .catch((error) => {
        alertify.alert(`Reset hasła`, error.message);
      });
  };
  return (
    <div>
      <h3 id="transition-modal-title" className={classes.text}>
        Resetowanie hasła
      </h3>
      <p id="transition-modal-description" className={classes.text}>
        Podaj adres e-mail, do którego chcesz zresetować hasło.
      </p>
      <form onSubmit={handleSubmit(handleReset)}>
        <Input icon={<Email />} error={errors.email?.message}>
          <input type="text" placeholder="E-mail" {...register('email')} />
        </Input>
        <Button
          style={{
            marginTop: '10px',
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Resetuj
        </Button>
      </form>
    </div>
  );
};

export default PasswordReset;
