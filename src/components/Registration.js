import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import Input from './Input';
import { Email, Lock } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { auth } from '../services/Firebase';

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

const schema = yup.object().shape({
    email: yup
        .string()
        .required('E-mail jest wymagany')
        .email('Podany adres jest niepoprawny'),
    password: yup
        .string()
        .required('Hasło jest wymagane')
        .min(8, 'Hasło musi zawierać przynajmniej 8 znaków'),
    passwordConfirm: yup
        .string()
        .required('Potwierdź hasło')
        .min(8, 'Hasło musi zawierać przynajmniej 8 znaków')
        .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same'),
    firstName: yup.string().required('Imię jest wymagane'),
    lastName: yup.string().required('Nazwisko jest wymagane'),
});

const Registration = () => {
    const [{}, dispatch] = useStateValue();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const signOn = (data) => {
        console.log(data);
        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then((authUser) => {
                authUser.user.sendEmailVerification();
                alert(
                    `Potwierdź rejestrację klikając w link aktywacyjny wysłany na Twoją skrzynkę`,
                );
                reset();
                return authUser.user.updateProfile({
                    displayName: `${data.firstName} ${data.lastName}`,
                });
            })
            .catch((err) => alert(err.message));
    };
    return (
        <Wrapper>
            <h1>Zarejestruj się!</h1>
            <Form key={1} onSubmit={handleSubmit(signOn)}>
                <Input icon={<Email />} error={errors.email?.message}>
                    <input
                        type='text'
                        placeholder='E-mail'
                        {...register('email')}
                    />
                </Input>
                <Input icon={<PersonIcon />} error={errors.firstName?.message}>
                    <input
                        type='text'
                        placeholder='Imię'
                        {...register('firstName')}
                    />
                </Input>
                <Input icon={<PersonIcon />} error={errors.lastName?.message}>
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
                <Input icon={<Lock />} error={errors.passwordConfirm?.message}>
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
                    <Link to='/'>
                        <Button
                            style={{ marginTop: '10px' }}
                            color='primary'
                            variant='contained'
                            type='button'
                            onClick={() => {
                                reset();
                            }}
                        >
                            Zaloguj się
                        </Button>
                    </Link>
                </div>
            </Form>
        </Wrapper>
    );
};

export default Registration;
