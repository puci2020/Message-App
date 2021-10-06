import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useAuth } from '../../services/AuthProvider';
import db from '../../services/Firebase';
import { showFullDate } from '../../utils/Date';
import Like from './Like';

const Wrapper = styled.div`
  width: fit-content;
  margin-bottom: 20px;
  margin-left: ${(props) => (props.own ? 'auto' : '')};
  border-radius: 20px;
  padding: 10px;
  max-width: 60%;
  background-color: ${(props) => (props.own ? '#3aecdc7d' : 'white')};
  flex-direction: ${(props) => (props.own ? 'row' : 'row-reverse')};
  justify-content: ${(props) => (props.own ? 'flex-end' : 'flex-start')};
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  width: fit-content;
  /* max-width: 90%; */
`;

const Text = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
  max-width: 25vw;
  .text {
    margin-bottom: 10px;

    .image {
      width: 100%;
      height: auto;
    }
  }
`;

const A = styled.a`
  display: flex;
  align-items: center;
  color: black;

  svg {
    margin-right: 5px;
  }

  &:hover {
    color: gray;
  }
`;

const Date = styled.div`
  min-width: fit-content;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-size: ${({ theme }) => theme.font.size.xxs};
  color: darkslategray;
  display: flex;
  align-items: flex-end;
  /* margin-left: 10px; */
`;

const Author = styled.span`
  margin-bottom: 10px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.xxs};
`;

const Message = ({ id, roomId, own, user, text, type, fileName, date }) => {
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(null);
  const [likes, setLikes] = useState([]);
  const [displayName, setDisplayName] = useState(null);
  const { currentUser } = useAuth();

  const getUserName = async (uid) => {
    await db
      .collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) setDisplayName(doc.data().userName);
      });
  };

  useEffect(async () => {
    await db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .doc(id)
      .collection('likes')
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length !== likes.length)
          setLikes(
            snapshot.docs.map((doc) => ({
              likeId: doc.id,
              data: doc.data(),
            }))
          );
        setLoading(false);
      });
    // return unsubscribe;
  }, [like]);

  useEffect(async () => {
    await likes.forEach((el) => {
      if (el.data.user === currentUser.email) setLike(el);
    });
    if (user) getUserName(user);
  }, [loading]);

  const handleLikeMessage = async () => {
    if (like) {
      await db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(id)
        .collection('likes')
        .doc(like.likeId)
        .delete()
        .then(() => setLike(null));
    } else {
      await db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(id)
        .collection('likes')
        .add({
          user: currentUser.email,
          liked: true,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setLoading(true);
    }
  };

  const handleCheckFileType = (fileType, name, message) => {
    if (
      fileType === 'image/png' ||
      fileType === 'image/jpeg' ||
      fileType === 'image/jpeg'
    ) {
      return (
        <div className="text">
          <img className="image" src={message} alt={message} />
        </div>
      );
    }
    return (
      <div className="text">
        <A href={message} target="_blank" rel="noreferrer">
          <AiOutlineFilePdf />
          {name}
        </A>
      </div>
    );
  };

  return (
    <Wrapper own={own}>
      <Like
        handleLike={handleLikeMessage}
        own={own}
        liked={like?.data.liked}
        number={likes?.length}
      />

      <Content>
        <Author>{user ? displayName : null}</Author>

        <Text>
          {type === 'text' ? (
            <div className="text">{text}</div>
          ) : (
            handleCheckFileType(type, fileName, text)
          )}

          <Date>{date ? showFullDate(date) : null}</Date>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default Message;

Message.defaultProps = {
  own: false,
  user: null,
  date: null,
  fileName: null,
  type: null,
};
Message.propTypes = {
  id: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  own: PropTypes.bool,
  user: PropTypes.string,
  text: PropTypes.string.isRequired,
  date: PropTypes.shape({
    seconds: PropTypes.number,
    nanoseconds: PropTypes.number,
  }),
  fileName: PropTypes.string,
  type: PropTypes.string,
};
