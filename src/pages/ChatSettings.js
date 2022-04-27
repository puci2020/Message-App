import { Avatar, Button, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { dateToString, timeToString } from 'utils/Date';
import ChatItem from '../components/ChatItem';
import Header from '../components/Header';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';
import UpdateUserDataModal from '../components/UpdateUserDataModal';
import toggleUpdateUserData from '../state/actions/updateUserDataActions';
import toggleSidebar from '../state/actions/sidebarActions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;

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
  background-color: ${({ theme }) => theme.colors.chatBackground};
  color: ${({ theme }) => theme.colors.font.primary};

  svg {
    color: ${({ theme }) => theme.colors.font.primary}
  }

  a {
    text-decoration: none;
    color: black;

  }
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
    const [updateType, setUpdateType] = useState(null);
    const { currentUser } = useAuth();
    const [roomName, setRoomName] = useState();
    const [roomPhoto, setRoomPhoto] = useState();
    const room = useSelector((state) => state.room);
    const sidebar = useSelector((state) => state.sidebar);
    const messages = useSelector((state) => state.messages);
    const [dataCSV, setDataCSV] = useState([]);
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

      const tab = [];

      for (let i = 0; i < messages.length; i += 1) {
        tab.push({
          'wiadomość': messages[i].data.message,
          'data': dateToString(messages[i].data.timestamp),
          'godzina': timeToString(messages[i].data.timestamp),
          'użytkownik': messages[i].data.userName,
        });
      }
      setDataCSV(tab);
    }, []);

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
              name='Ustawienia czatu'
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
                id='menuButton'
                onClick={() => dispatch(toggleSidebar())}
              >
                {sidebar ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </>
          }
        />
        <Body>
          <Avatar alt={roomName}
                  src={roomPhoto}
                  className={classes.large} />
          {room.name && room.user === currentUser.uid ?
            <Tooltip title='Edytuj zdjęcie'>
              <IconButton id='menuButton'
                          size='small'
                          onClick={editImageChat}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            : null}
          <Field>
            <h3>{roomName}</h3>
            {room.name && room.user === currentUser.uid ?
              <Tooltip title='Edytuj nazwę'>
                <IconButton id='menuButton'
                            size='small'
                            onClick={editNameChat}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              : null}
          </Field>
          <CSVLink
            data={dataCSV}
            filename={`${roomName}_history_${new Date().toISOString()}.csv`}>
            <Tooltip title='Pobierz historię wiadomości'>
              <Button
                style={{ marginTop: '10px' }}
                color='primary'
                variant='contained'
                type='button'
              >
                Pobierz CSV
              </Button>
            </Tooltip>
          </CSVLink>
        </Body>
        <UpdateUserDataModal type={updateType}
                             id={id} />
      </Wrapper>
    )
      ;
  }
;
export default ChatSettings;
