import { Button } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import React from 'react';
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
        // switch () {
        //     case 'google':
        //         auth.signInWithPopup(provider)
        //             .then((result) => {
        //                 dispatch({
        //                     type: actionTypes.SET_USER,
        //                     user: result.user,
        //                     // isNewUser: result.isNewUser,
        //                 });
        //             })
        //             .catch((error) => alert(error.message));
        //         break;
        //     case 'facebook':
        //         auth.signInWithPopup(facebookProvider)
        //             .then((result) => {
        //                 dispatch({
        //                     type: actionTypes.SET_USER,
        //                     user: result.user,
        //                 });
        //             })
        //             .catch((error) => alert(error.message));
        //         break;
        //     default:
        //         console.log(`Błąd logowania`);
        // }
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

    return (
        <Wrapper>
            <h1>Zaloguj się!</h1>
            <Form>
                <Input icon={<Email />} />
                <Input icon={<Lock />} />
                <Button
                    style={{ marginTop: '10px' }}
                    color='primary'
                    variant='contained'
                    type='submit'
                >
                    Zaloguj się
                </Button>
            </Form>
            {/* <Button
                color='primary'
                variant='contained'
                type='submit'
                onClick={login}
            >
                Zaloguj się z Google
            </Button> */}
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
        </Wrapper>
    );
};

export default Login;
