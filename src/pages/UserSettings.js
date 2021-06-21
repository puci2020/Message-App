import {
  Avatar,
  Badge,
  IconButton,
  makeStyles,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import styled from 'styled-components';
import ChatItem from '../components/ChatItem';
import Header from '../components/Header';
import { useAuth } from '../services/AuthProvider';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import UpdateUserDataModal from '../components/UpdateUserDataModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  /* align-items: center; */
  /* justify-content: center; */

  ${({ theme }) => theme.media.tablet} {
    flex: 1;
  }
`;
const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Field = styled.div`
  padding: 10px;
  display: grid;
  /* grid-template-rows: 1fr; */
  grid-template-columns: 2fr auto;
  grid-gap: 20px;
  h3 {
    display: flex;
    align-items: center;
  }
`;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const UserSettings = () => {
  const classes = useStyles();
  const [{ sidebar }, dispatch] = useStateValue();
  const { currentUser } = useAuth();

  const showHideSidebar = () => {
    dispatch({
      type: actionTypes.SET_SIDEBAR,
      sidebar: !sidebar,
    });
  };

  const openNameUpdate = () => {
    dispatch({
      type: actionTypes.SET_UPDATE_USER_DATA,
      updateUserData: true,
    });
  };

  return (
    <Wrapper>
      <Header
        left={
          <ChatItem
            name="Ustawienia użytkownika"
            // info={
            //   roomName
            //     ? displayRoomInfo(lastSeen)
            //     : 'Wybierz czat z menu aby rozmawiać'
            // }
          />
        }
        right={
          <>
            <IconButton id="menuButton" onClick={showHideSidebar}>
              {sidebar ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </>
        }
      />
      <Body>
        <Avatar
          alt={currentUser.displayName}
          src={currentUser.photoURL}
          className={classes.large}
        />
        <Field>
          <h3>{currentUser.displayName}</h3>
          <Tooltip title="Edytuj">
            <IconButton id="menuButton" size="small" onClick={openNameUpdate}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Field>
        <Field>
          <h3>{currentUser.email}</h3>
          <Tooltip title="Edytuj">
            <IconButton id="menuButton" size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Field>
      </Body>
      <UpdateUserDataModal type="nameUpdate" />
    </Wrapper>
  );
};
export default UserSettings;
