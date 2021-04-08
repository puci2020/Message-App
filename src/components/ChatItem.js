import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const ChatItem = ({ newChat }) => {
  const createNewChat = () => {
      const roomName = prompt("Podaj nazwę czatu!");

    //   if(rootName){

    //   }
  };

  return !newChat ? (
    <Wrapper>
      <Avatar>PA</Avatar>
      <Info>
        <h3>Nazwa</h3>
        <p>Ostatnia wiadomość...</p>
      </Info>
    </Wrapper>
  ) : (
    <Wrapper onClick={createNewChat}>
      <h3>Stwórz czat</h3>
    </Wrapper>
  );
};

export default ChatItem;
