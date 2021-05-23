import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStateValue } from '../services/StateProvider';
import { actionTypes } from '../services/reducer';
import Input from './Input';
import { Email } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from '../services/Firebase';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: `#ededed`,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const schema = yup.object().shape({
    email: yup
        .string()
        .required('E-mail jest wymagany')
        .email('Podany adres jest niepoprawny'),
});

const PasswordResetModal = () => {
    const classes = useStyles();
    const [{ passwordReset }, dispatch] = useStateValue();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleClose = () => {
        dispatch({
            type: actionTypes.SET_PASSWORD_RESET,
            passwordReset: false,
        });
    };

    const handleReset = (data) => {
        auth.sendPasswordResetEmail(data.email)
            .then(() => alert(`Email został wysłany!`))
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={passwordReset}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={passwordReset}>
                <div className={classes.paper}>
                    <h3 id='transition-modal-title'>Resetowanie hasła</h3>
                    <p id='transition-modal-description'>
                        Podaj adres e-mail, do którego chcesz zresetować hasło.
                    </p>
                    <form onSubmit={handleSubmit(handleReset)}>
                        <Input icon={<Email />} error={errors.email?.message}>
                            <input
                                type='text'
                                placeholder='E-mail'
                                {...register('email')}
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
                            Resetuj
                        </Button>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};

export default PasswordResetModal;
