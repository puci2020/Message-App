import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Lock } from '@material-ui/icons';
import alertify from 'alertifyjs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import { useAuth } from '../../services/AuthProvider';
import { actionTypes } from '../../services/reducer';
import { useStateValue } from '../../services/StateProvider';
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

const emailUpdateSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail jest wymagany')
    .email('Podany adres jest niepoprawny'),
  emailNew: yup
    .string()
    .required('Nowy adres e-mail jest wymagany')
    .email('Podany adres jest niepoprawny'),
  password: yup
    .string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi zawierać przynajmniej 8 znaków'),
});

const EmailUpdate = () => {
  const classes = useStyles();
  const { currentUser, signInWithEmail, logOut } = useAuth();
  // eslint-disable-next-line no-empty-pattern
  // const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(emailUpdateSchema) });

  // const handleCloseUpdate = () => {
  //   dispatch({
  //     type: actionTypes.SET_UPDATE_USER_DATA,
  //     updateUserData: false,
  //   });
  // };

  const handleLogOut = async () => {
    await logOut();
    history.push('/login');
  };

  const update = async (newEmail) => {
    try {
      await currentUser.updateEmail(newEmail);
      reset();
      dispatch(toggleUpdateUserData());
      handleLogOut();
      alertify.success('Zaktualizowano pomyślnie, zaloguj się ponownie');
    } catch (error) {
      alertify.alert(`Błąd`, error.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
      update(data.emailNew);
    } catch (error) {
      alertify.alert(`Błąd`, error.message);
    }
  };
  return (
    <div>
      <h3 id='transition-modal-title'
          className={classes.text}>
        Zmiana adresu E-mail
      </h3>
      <p id='transition-modal-description'
         className={classes.text}>
        Podaj nowy adres E-mail
      </p>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Input icon={<Email />}
               error={errors.email?.message}>
          <input type='text'
                 placeholder='E-mail' {...register('email')} />
        </Input>
        <Input icon={<Lock />}
               error={errors.password?.message}>
          <input
            type='password'
            placeholder='Hasło'
            {...register('password')}
          />
        </Input>
        <Input icon={<Email />}
               error={errors.emailNew?.message}>
          <input
            type='text'
            placeholder='Nowy e-mail'
            {...register('emailNew')}
          />
        </Input>
        <Button
          style={{
            marginTop: '10px',
          }}
          color='primary'
          variant='contained'
          type='submit'
        >
          Aktualizuj email
        </Button>
      </form>
    </div>
  );
};

export default EmailUpdate;
