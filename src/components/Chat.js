import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import ChatItem from "./ChatItem";
import Message from "./Message";
import MessageForm from "./MessageForm";

const Wrapper = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  /* background-color: blue; */
`;

const Body = styled.div`
  /* background-color: darkgray; */
  background-image: url("https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  /* height: auto; */
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  /* position: relative;
  display: flex;
  flex-direction: column; */
`;

const Footer = styled.div``;

const Chat = () => {
  return (
    <Wrapper>
      <Header
        left={<ChatItem name={"Nazwa"} info={"Ostatnio widziana..."} />}
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
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message date={'12:33'} text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message own user={true ? '' : 'Adam P'} date={'12:36'} text={'asda asda asd dfg sdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message own user={'Piotr'} date={'12:37'} text={'asda asd asd as dasd sssssssssss sd as da s d asd a sd asd skjsdhf skjdfh skdjfhksjdfh skdj  lskdfjhlskdf dasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'asdasdasd'}/>
        <Message text={'koko'}/>
      </Body>
        <MessageForm/>
    </Wrapper>
  );
};

export default Chat;
