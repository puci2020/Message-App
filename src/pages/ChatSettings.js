import { Avatar, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ChatItem from '../components/ChatItem';
import Header from '../components/Header';
import { useAuth } from '../services/AuthProvider';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import db from '../services/Firebase';
import UpdateUserDataModal from '../components/UpdateUserDataModal';
import toggleUpdateUserData from '../state/actions/updateUserDataActions';
import toggleSidebar from '../state/actions/sidebarActions';

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

const ChatSettings = () => {
  const { id } = useParams();
  const classes = useStyles();
  // const [{ sidebar, currentProvider }, dispatch] = useStateValue();
  const [updateType, setUpdateType] = useState(null);
  const { currentUser } = useAuth();
  const [roomName, setRoomName] = useState();
  const [roomPhoto, setRoomPhoto] = useState();

  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (id) {
      await db
        .collection('rooms')
        .doc(id)
        .onSnapshot((snapschot) => {
          setRoomName(snapschot.data().name);
          setRoomPhoto(snapschot.data().photoURL);
        });
    }
  }, []);

  // const openUpdate = () => {
  //   dispatch({
  //     type: actionTypes.SET_UPDATE_USER_DATA,
  //     updateUserData: true,
  //   });
  // };

  // const showHideSidebar = () => {
  //   dispatch({
  //     type: actionTypes.SET_SIDEBAR,
  //     sidebar: !sidebar,
  //   });
  // };

  const editNameChat = () => {
    setUpdateType('nameChatUpdate');
    dispatch(toggleUpdateUserData());
  };

  const editImageChat = () => {
    setUpdateType('imageChatUpdate');
    dispatch(toggleUpdateUserData());
  };
  return (
    <Wrapper>
      <Header
        left={
          <ChatItem
            name="Ustawienia czatu"
            avatar={roomPhoto}
            // info={
            //   roomName
            //     ? displayRoomInfo(lastSeen)
            //     : 'Wybierz czat z menu aby rozmawiać'
            // }
          />
        }
        right={
          <>
            <IconButton
              id="menuButton"
              onClick={() => dispatch(toggleSidebar())}
            >
              {sidebar ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </>
        }
      />
      <Body>
        <Avatar alt={roomName} src={roomPhoto} className={classes.large} />
        <Tooltip title="Edytuj zdjęcie">
          <IconButton id="menuButton" size="small" onClick={editImageChat}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Field>
          <h3>{roomName}</h3>
          <Tooltip title="Edytuj nazwę">
            <IconButton id="menuButton" size="small" onClick={editNameChat}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Field>
      </Body>
      <UpdateUserDataModal type={updateType} id={id} />
    </Wrapper>
  );
};

export default ChatSettings;
