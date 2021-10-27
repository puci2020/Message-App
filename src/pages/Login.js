import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import alertify from 'alertifyjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useAuth } from '../services/AuthProvider';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import Input from '../components/Input';
import UpdateUserDataModal from '../components/UpdateUserDataModal';
import toggleUpdateUserData from '../state/actions/updateUserDataActions';

const Wrapper = styled.div`
  width: 600px;
  max-width: 90vw;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.font.primary};
`;

const Form = styled.form`
  margin: 20px;
  width: 60%;
  display: grid;
  place-items: center;

  ${({ theme }) => theme.media.phone} {
    width: 90%;

    .button__group {
      display: flex;
      justify-content: center;
    }
  }
;
`;

const ButtonsWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoundButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  background-color: ${({ color }) => color};
  display: grid;
  place-items: center;

  svg {
    width: 50%;
    height: auto;
    color: white;
  }

  &:hover {
    cursor: pointer;
    box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
  }
`;

const PasswordReset = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.font.size.xxs};
  color: gray;

  span {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;

    /* &:focus {
      border: 1px solid red;
    } */

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.menu.hoverLink};
    }
  }
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail jest wymagany')
    .email('Podany adres jest niepoprawny'),
  password: yup
    .string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi zawierać przynajmniej 8 znaków'),
});

const Login = () => {
  // eslint-disable-next-line no-empty-pattern
  // const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { signInWithEmail, signInWithGoogle, signInWithFacebook } = useAuth();
  const dispatch = useDispatch();

  const google = async () => {
    try {
      await signInWithGoogle();
      history.push('/');
    } catch (error) {
      alertify.alert(`Błąd`, error.message);
    }
  };

  const facebook = async () => {
    try {
      await signInWithFacebook();
      history.push('/');
    } catch (error) {
      alertify.alert(`Błąd`, error.message);
    }
  };

  // const github = () => {
  //     auth.signInWithPopup(githubProvider)
  //         .then((result) => {
  //             dispatch({
  //                 type: actionTypes.SET_USER,
  //                 user: result.user,
  //             });
  //         })
  //         .catch((error) => alertify.alert(`Błąd`, error.message));
  // };

  const signIn = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
      history.push('/');
    } catch (error) {
      alertify.alert(`Błąd`, error.message);
    }
  };

  // const openPasswordReset = () => {
  //   dispatch({
  //     type: actionTypes.SET_UPDATE_USER_DATA,
  //     updateUserData: true,
  //   });
  // };

  return (
    <Wrapper>
      <h1>Zaloguj się!</h1>
      <Form key={2}
            onSubmit={handleSubmit(signIn)}>
        <Input icon={<Email />}
               error={errors.email?.message}>
          <input type='text'
                 placeholder='E-mail' {...register('email')} />
        </Input>
        <Input icon={<Lock />}
               error={errors.password?.message}>
          <input
            placeholder='Hasło'
            type='password'
            {...register('password')}
          />
        </Input>
        <PasswordReset>
          <span
            role='button'
            tabIndex={0}
            onClick={() => dispatch(toggleUpdateUserData())}
            onKeyDown={() => dispatch(toggleUpdateUserData())}
          >
            Nie pamiętam hasła
          </span>
        </PasswordReset>
        <div className='button__group'>
          <Button
            style={{
              marginTop: '10px',
              marginRight: '20px',
            }}
            color='primary'
            variant='contained'
            type='submit'
          >
            Zaloguj się
          </Button>
          <Link to='/registration'
                style={{ textDecoration: 'none' }}>
            <Button
              style={{ marginTop: '10px' }}
              color='primary'
              variant='contained'
              type='button'
              onClick={() => {
                reset();
              }}
            >
              Zarejestruj się
            </Button>
          </Link>
        </div>
      </Form>
      <ButtonsWraper>
        <RoundButton color='red'
                     onClick={google}>
          <FaGoogle />
        </RoundButton>
        <RoundButton color='#4267B2'
                     onClick={facebook}>
          <FaFacebookF />
        </RoundButton>
        {/* <RoundButton color={'#24292e'} onClick={github}>
                    <FaGithub />
                </RoundButton> */}
      </ButtonsWraper>
      <UpdateUserDataModal type='passwordReset' />
    </Wrapper>
  );
};

export default Login;
