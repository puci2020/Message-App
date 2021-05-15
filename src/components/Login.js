import { Button } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
    auth,
    provider,
    facebookProvider,
    githubProvider,
} from '../services/Firebase';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import Input from './Input';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 5px;
    box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Form = styled.form`
    margin: 20px;
    width: 60%;
    display: grid;
    place-items: center;
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

const schema = yup.object().shape({
    email: yup
        .string()
        .required('E-mail jest wymagany')
        .email('Podany adres jest niepoprawny'),
    password: yup
        .string()
        .required('Hasło jest wymagane')
        .min(8, 'Hasło musi zawierać przynajmniej 8 znaków'),
    // passwordConfirm: yup
    //     .string()
    //     .required('Potwierdź hasło')
    //     .min(8, 'Hasło musi zawierać przynajmniej 8 znaków')
    //     .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same'),
    // firstName: yup.string().required('Imię jest wymagane'),
    // lastName: yup.string().required('Nazwisko jest wymagane'),
});

const Login = () => {
    const [{}, dispatch] = useStateValue();
    const [signUp, setSignUp] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const google = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                    // isNewUser: result.isNewUser,
                });
            })
            .catch((error) => alert(error.message));
    };

    const facebook = () => {
        auth.signInWithPopup(facebookProvider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };

    const github = () => {
        auth.signInWithPopup(githubProvider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
                console.log(result);
            })
            .catch((error) => alert(error.message));
    };

    const signIn = (data) => {
        console.log(data);
    };

    const signOn = (data) => {
        console.log(data);
    };
    return (
        <Wrapper>
            <h1>Zaloguj się!</h1>
            {/* <h1>Zaloguj się!</h1> */}

            {/* {signUp ? (
                <Form key={1} onSubmit={handleSubmit(signOn)}>
                    <Input icon={<Email />} error={errors.email?.message}>
                        <input
                            type='text'
                            placeholder='E-mail'
                            {...register('email')}
                        />
                    </Input>
                    <Input
                        icon={<PersonIcon />}
                        error={errors.firstName?.message}
                    >
                        <input
                            type='text'
                            placeholder='Imię'
                            {...register('firstName')}
                        />
                    </Input>
                    <Input
                        icon={<PersonIcon />}
                        error={errors.lastName?.message}
                    >
                        <input
                            type='text'
                            placeholder='Nazwisko'
                            {...register('lastName')}
                        />
                    </Input>
                    <Input icon={<Lock />} error={errors.password?.message}>
                        <input
                            type='password'
                            placeholder='Hasło'
                            {...register('password')}
                        />
                    </Input>
                    <Input
                        icon={<Lock />}
                        error={errors.passwordConfirm?.message}
                    >
                        <input
                            type='password'
                            placeholder='Powtórz hasło'
                            {...register('passwordConfirm')}
                        />
                    </Input>
                    <div className='button__group'>
                        <Button
                            style={{ marginTop: '10px', marginRight: '20px' }}
                            color='primary'
                            variant='contained'
                            type='submit'
                        >
                            Zarejestruj się
                        </Button>
                        <Button
                            style={{ marginTop: '10px' }}
                            color='primary'
                            variant='contained'
                            type='button'
                            onClick={() => {
                                setSignUp(!signUp);
                                reset();
                            }}
                        >
                            Zaloguj się
                        </Button>
                    </div>
                </Form>
            ) : (
                <> */}
            <Form key={2} onSubmit={handleSubmit(signIn)}>
                <Input icon={<Email />} error={errors.email?.message}>
                    <input
                        type='text'
                        placeholder='E-mail'
                        {...register('email')}
                    />
                </Input>
                <Input icon={<Lock />} error={errors.password?.message}>
                    <input
                        placeholder='Hasło'
                        type='password'
                        {...register('password')}
                    />
                </Input>
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
                    <Link to='/registration'>
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
                <RoundButton color={'red'} onClick={google}>
                    <FaGoogle />
                </RoundButton>
                <RoundButton color={'#3b5998'} onClick={facebook}>
                    <FaFacebookF />
                </RoundButton>
                <RoundButton color={'#24292e'} onClick={github}>
                    <FaGithub />
                </RoundButton>
            </ButtonsWraper>
            {/* </> */}
            {/* )} */}
            {/* <Button
                color='primary'
                variant='contained'
                type='submit'
                onClick={login}
            >
                Zaloguj się z Google
            </Button> */}
        </Wrapper>
    );
};

export default Login;
