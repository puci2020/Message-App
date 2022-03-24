import React from 'react';
import styled from 'styled-components';
import { Button, Tooltip } from '@material-ui/core';
import toggleSidebar from 'state/actions/sidebarActions';
import { AddCircle } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import alertify from 'alertifyjs';
import db from 'services/Firebase';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'services/AuthProvider';

const Wrapper = styled.div`
  height: 75px;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  Button {
    width: 45%;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.font.primary};
    font-size: ${({ theme }) => theme.font.size.xxs};

    &:hover {
      background-color: ${({ theme }) => theme.colors.menu.hoverLink};
    }

    svg {
      margin-right: 10px;
    }
  }

`;

const BottomButtons = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const createNewChat = async () => {

    await alertify.prompt(
      'Nowy czat',
      'Podaj nazwę czatu',
      'Nazwa czatu',
      (evt, value) => {
        if (value) {
          db.collection('rooms').add({
            name: value,
            lastMessage: null,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: null,
            user: currentUser.uid.toString(),
          });
          alertify.success(`Czat o nazwie "${value}" utworzony pomyślnie!`);
        } else {
          alertify.warning(`Nazwa czatu nie może być pusta!`);
        }
      },
      () => {
        alertify.error('Tworzenie czatu anulowano');
      },
    );
  };
  return (
    <Wrapper>
      <Tooltip
        title='Stwórz nowy czat'
      >
        <Button onClick={() => {
          dispatch(toggleSidebar());
          createNewChat();
        }}>
          <AddCircle />
          Nowy czat</Button></Tooltip>
      <Tooltip
        title='Ustawienia konta'
      >
        <Button onClick={() => {
          dispatch(toggleSidebar());
          history.push(`/settings/user/${currentUser.uid}`);
        }}>
          <SettingsIcon />Ustawienia</Button></Tooltip>
    </Wrapper>
  );
};

export default BottomButtons;
