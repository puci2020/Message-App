import React, { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
// import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from 'state/actions/messagesAction';
import { useAuth } from '../../services/AuthProvider';
import db from '../../services/Firebase';
import Loader from '../Loader';

const Message = React.lazy(() => import('./Message'));

const Body = styled.div`
  /* background-image: url('https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'); */
  background-color: ${({ theme }) => theme.colors.chatBackground};
  border-top: ${({ theme }) => theme.colors.borderSecondaryr};
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  min-height: 100%;
  max-width: 100vw;
`;

const ChatBody = ({ id }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const { currentUser } = useAuth();
  const messages = useSelector((state) => state.messages);
  const filter = useSelector((state) => state.filterMessage);
  const dispatch = useDispatch();

  useEffect(async () => {
    let cancel = true;
// cancel in first if
    if (id && cancel) {
      await db
        .collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          if (cancel)
            if (snapshot.docs.length !== messages.length) {
              dispatch(setMessages(
                snapshot.docs.map((doc) => ({
                  messageId: doc.id,
                  data: doc.data(),
                })),
              ));
              setFilteredMessages(messages);
            }
        });
      return () => {
        cancel = false;
      };
    }
    return null;
  }, [id]);

  useEffect(() => {
      if (filter.length > 0) {
        const result = messages.findIndex((message) =>
          message.data.message.toLowerCase().includes(filter.toLowerCase()),
        );
        console.log(result);
        if (result !== -1)
          setFilteredMessages(messages.filter((_, index) => index >= result));
        else {
          console.log('brak');
          setFilteredMessages([]);

        }
      } else {
        setFilteredMessages(messages);
      }
    }
    ,
    [filter],
  )
  ;

  return (
    <ScrollToBottom className='scroll'>
      <Suspense fallback={<Loader />}>
        <Body>
          {id &&
          filteredMessages.map((message) => (
            <Message
              id={message.messageId}
              roomId={id}
              own={message.data.user === currentUser?.uid}
              user={
                message.data.user === currentUser?.uid
                  ? null
                  : message.data.user
              }
              date={message.data.timestamp}
              text={message.data.message}
              type={message.data.type}
              fileName={message.data.fileName}
              key={message.data.timestamp}
            />
          ))}
        </Body>
      </Suspense>
    </ScrollToBottom>
  );
};

export default ChatBody;

ChatBody.defaultProps = {
  id: null,
};

ChatBody.propTypes = {
  id: PropTypes.string,
};
