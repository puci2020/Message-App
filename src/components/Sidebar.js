import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import ChatItem from "./ChatItem";
import Header from "./Header";
import db from "../services/Firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;
`;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   border: 1px solid lightgray;
//   overflow: hidden;
// `;

// const RightHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   min-width: 10vw;

//   /* .MuiSvgIcon-root{
//       margin-right: 2vw;
//       font-size: 24px;
//   } */
// `;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 90px;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  overflow: hidden;

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    height: 100%;
  }

  .inputField {
    display: flex;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    padding-left: 10px;

    svg {
      color: gray;
    }
  }
`;

const Chats = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;
`;

const Sidebar = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ));

    return () => {
      unsubscribe();
    }
    
  }, [])

  return (
    <Wrapper>
      <Header
      left={
        <ChatItem/>
      }
        right={
          <>
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </>
        }
      />

      {/* <Header>
        <Avatar />
        <RightHeader>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </RightHeader>
      </Header> */}
      <Search>
        <div className="inputField">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Wyszukaj czat!"
          ></input>
        </div>
      </Search>
      <Chats>
        <ChatItem newChat chat />
        {rooms.map(room => (
        <ChatItem chat key={room.id} id={room.id} name={room.data.name} info={'Ostatnia wiadomość...'} />
        ))}
        
        
      </Chats>
    </Wrapper>
  );
};

export default Sidebar;
