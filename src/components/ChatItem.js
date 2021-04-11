import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import db from "../services/Firebase";
import { Link } from "react-router-dom";

const Wrapper = styled.div`

  width: 100%;
  height: ${(props) => (props.chat ? "70px" : "auto")};
  border-bottom: ${(props) => (props.chat ? "1px solid #f6f6f6" : "")};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.secondary}; */
  display: flex;
  align-items: center;
  padding: ${(props) => (props.chat ? "10px 20px" : "")};
  /* position: ${(props) => (props.chat ? "static" : "relative")}; */
  /* top: ${(props) => (props.chat ? "" : "0")}; */
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.chat ? "#f6f6f6" : "")};
    cursor: ${(props) => (props.chat ? "pointer" : "default")};
    /* background-color: ${({ theme }) => theme.colors.secondary}; */
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  p {
    color: ${(props) => (props.chat ? "black" : "gray")};
  }
`;

const ChatItem = ({ id, newChat, chat, avatar, name, info }) => {
  const createNewChat = () => {
    const roomName = prompt("Podaj nazwę czatu!");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !newChat ? (
    <Link to={`/room/${id}`}>
      <Wrapper chat={chat}>
        <Avatar>{avatar}</Avatar>
        <Info>
          <h3>{name}</h3>
          <p>{info}</p>
        </Info>
      </Wrapper>
    </Link>
  ) : (
    <Wrapper chat={chat} onClick={createNewChat}>
      <h3>Stwórz czat</h3>
    </Wrapper>
  );
};

export default ChatItem;
