import { Button } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
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

const Login = () => {
    const [{}, dispatch] = useStateValue();
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(null);

    const login = () => {
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

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const signInValidation = () => {
        if (email === '') {
            setEmailValid('Podaj adres e-mail');
        } else if (!validateEmail(email)) {
            setEmailValid('Podany adres jest nieprawidłowy');
        } else {
            setEmailValid(null);
        }

        if (password === '') {
            setPasswordValid('Podaj hasło');
        } else if (password.length < 8) {
            setPasswordValid('Hasło powinno mieć więcej niż 8 znaków');
        } else {
            setPasswordValid(null);
        }

        if (emailValid === null && passwordValid === null) {
            console.log(emailValid);
            console.log(passwordValid);
            return true;
        } else {
            console.log(emailValid);
            console.log(passwordValid);
            return false;
        }
        // setEmailValid(null);
        // setPasswordValid(null);
        // return true;
    };

    const signIn = (e) => {
        const isValid = signInValidation();
        e.preventDefault();

        console.log(signInValidation());

        if (isValid) {
            console.log('działa');
        } else {
            console.log('nie');
        }
    };

    return (
        <Wrapper>
            {signUp ? <h1>Zarejestruj się!</h1> : <h1>Zaloguj się!</h1>}
            {/* <h1>Zaloguj się!</h1> */}

            {signUp ? (
                <Form>
                    <Input icon={<Email />} placeholder='E-mail' />
                    <Input icon={<PersonIcon />} placeholder='Imię' />
                    <Input icon={<PersonIcon />} placeholder='Nazwisko' />
                    <Input icon={<Lock />} placeholder='Hasło' />
                    <Input icon={<Lock />} placeholder='Powtórz hasło' />
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
                            }}
                        >
                            Zaloguj się
                        </Button>
                    </div>
                </Form>
            ) : (
                <>
                    <Form>
                        <Input
                            icon={<Email />}
                            placeholder='E-mail'
                            error={emailValid}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={<Lock />}
                            placeholder='Hasło'
                            type='password'
                            error={passwordValid}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='button__group'>
                            <Button
                                style={{
                                    marginTop: '10px',
                                    marginRight: '20px',
                                }}
                                color='primary'
                                variant='contained'
                                type='submit'
                                onClick={(e) => signIn(e)}
                            >
                                Zaloguj się
                            </Button>
                            <Button
                                style={{ marginTop: '10px' }}
                                color='primary'
                                variant='contained'
                                type='button'
                                onClick={() => {
                                    setSignUp(!signUp);
                                }}
                            >
                                {signUp
                                    ? 'Powrót do logowania'
                                    : 'Zarejestruj się'}
                                {/* Zarejestruj się */}
                            </Button>
                        </div>
                    </Form>
                    <ButtonsWraper>
                        <RoundButton color={'red'} onClick={login}>
                            <FaGoogle />
                        </RoundButton>
                        <RoundButton color={'#3b5998'} onClick={facebook}>
                            <FaFacebookF />
                        </RoundButton>
                        <RoundButton color={'#24292e'} onClick={github}>
                            <FaGithub />
                        </RoundButton>
                    </ButtonsWraper>
                </>
            )}
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
