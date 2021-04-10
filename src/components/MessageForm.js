import React, {useState} from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MicNoneIcon from '@material-ui/icons/MicNone';

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  padding: 10px 20px;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  input {
    padding-left: 10px;
    border: none;
    outline: none;
    margin-left: 10px;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    /* padding-left: 10px; */
  }
`;

const MessageForm = () => {

    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message);
        setMessage('');
    }

  return (
    <Wrapper>
      <form>
      <IconButton>
          <MicNoneIcon />
        </IconButton>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}  placeholder="Napisz wiadomość" />
        <IconButton>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <IconButton type="submit" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </form>
    </Wrapper>
  );
};

export default MessageForm;
