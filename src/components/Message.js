import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../services/AuthProvider';
import db from '../services/Firebase';
import { showFullDate } from '../utils/Date';
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
  display: flex;
  align-items: center;
`;

// const Like = styled.div`
//   margin: 5px;
//   display: flex;
//   align-items: center;

//   .number {
//     padding: 2px;
//     /* display: flex; */
//     /* align-items: flex-end; */
//     font-size: 14px;
//     /* background-color: #f6ccd2; */
//     color: black;

//     /* border-radius: 10px; */
//   }

//   svg {
//     /* position: absolute; */
//     width: 25px;
//     height: 25px;

//     &:hover {
//       cursor: pointer;
//     }
//   }
// `;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;

  .text {
    margin-bottom: 10px;
  }
`;

const Date = styled.div`
  min-width: fit-content;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-size: ${({ theme }) => theme.font.size.xxs};
  color: gray;
  display: flex;
  align-items: flex-end;
  /* margin-left: 10px; */
`;

const Author = styled.span`
  margin-bottom: 10px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.xxs};
`;

// eslint-disable-next-line react/prop-types
const Message = ({ id, roomId, own, user, text, date }) => {
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(null);
  const [likes, setLikes] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .doc(id)
      .collection('likes')
      .onSnapshot((snapshot) => {
        // console.log(snapshot);
        setLikes(
          snapshot.docs.map((doc) => ({
            likeId: doc.id,
            data: doc.data(),
          }))
        );
        setLoading(false);
      });
  }, [like]);

  useEffect(() => {
    likes.forEach((el) => {
      if (el.data.user === currentUser.email) {
        setLike(el);
      }
    });
  }, [loading]);

  const handleLikeMessage = () => {
    console.log('dziala');
    if (like) {
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(id)
        .collection('likes')
        .doc(like.likeId)
        .delete()
        .then(() => setLike(null));
    } else {
      db.collection('rooms')
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
  return (
    <Wrapper own={own}>
      <Like
        handleLike={handleLikeMessage}
        own={own}
        liked={like?.data.liked}
        number={likes?.length}
      />

      <Content>
        <Author>{user}</Author>

        <Text>
          <div className="text">{text}</div>
          <Date>{date ? showFullDate(date) : ''}</Date>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default Message;

Message.defaultProps = {
  own: false,
  user: '',
  date: null,
  // liked: null
};

Message.propTypes = {
  own: PropTypes.bool,
  user: PropTypes.string,
  text: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.object]),
  // liked: PropTypes.arrayOf.shape()
};
