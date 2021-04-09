import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import ChatItem from "./ChatItem";

const Wrapper = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  /* background-color: blue; */
`;

const Body = styled.div`
    background-color: darkgray;
    /* height: auto; */
    flex: 1;
    overflow-y: auto;
    div{
        height: 100px;
    }
`;

const Footer = styled.div``;

const Chat = () => {
  return (
    <Wrapper>
      <Header
        
        left={
            <ChatItem name={'Nazwa'} info={'Ostatnio widziana...'}/>
        }
        right={
          <>
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </>
        }
      />
      <Body>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
      </Body>
    </Wrapper>
  );
};

export default Chat;
