import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@material-ui/icons/Person';
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

const nameUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nazwa jest wymagana')
    .min(4, 'Nazwa musi składać się z miniumum 4 znaków'),
});

const NameChatUpdate = ({ id }) => {
  const classes = useStyles();
  const { currentUser, createUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(nameUpdateSchema) });

  const handleUpdate = async (data) => {
    await db
      .collection('rooms')
      .doc(id)
      .update({
        name: data.name,
      })
      .then(() => {
        alertify.success(`Nazwa czatu zmieniona`);
        reset();
      })
      .catch((error) => {
        alertify.alert(`Zmiana nazwy czatu`, error.message);
      });
  };
  return (
    <div>
      <h3 id="transition-modal-title" className={classes.text}>
        Zmiana nazwy czatu
      </h3>
      <p id="transition-modal-description" className={classes.text}>
        Podaj nową nazwę czatu
      </p>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Input icon={<PersonIcon />} error={errors.name?.message}>
          <input type="text" placeholder="Nazwa czatu" {...register('name')} />
        </Input>
        <Button
          style={{
            marginTop: '10px',
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Aktualizuj czat
        </Button>
      </form>
    </div>
  );
};

export default NameChatUpdate;

NameChatUpdate.defaultProps = {
  id: null,
};

NameChatUpdate.propTypes = {
  id: PropTypes.string,
};
