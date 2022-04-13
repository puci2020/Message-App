import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Tooltip } from '@material-ui/core';
import toggleSidebar from 'state/actions/sidebarActions';
import { AddCircle } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import alertify from 'alertifyjs';
import db from 'services/Firebase';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'services/AuthProvider';
import UpdateUserDataModal from 'components/UpdateUserDataModal';
import toggleUpdateUserData from 'state/actions/updateUserDataActions';

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
  const [updateType, setUpdateType] = useState(null);

  const createChat = () => {
    setUpdateType('newChat');
    dispatch(toggleUpdateUserData());
  };

  return (
    <Wrapper>
      <Tooltip
        title='Stwórz nowy czat'
      >
        <Button onClick={() => {
          dispatch(toggleSidebar());
          createChat();
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
      <UpdateUserDataModal type={updateType} />;
    </Wrapper>
  );
};

export default BottomButtons;
