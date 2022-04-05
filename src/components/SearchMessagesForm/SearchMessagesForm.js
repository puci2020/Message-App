import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@material-ui/icons/Person';
import alertify from 'alertifyjs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SearchOutlined } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { logDOM } from '@testing-library/react';
import toggleSearchMessage from 'state/actions/searchMessageActions';
import { setFilterMessage } from 'state/actions/filterMessageAction';
import db, { auth } from '../../services/Firebase';
import Input from '../Input';
import { useAuth } from '../../services/AuthProvider';
import toggleUpdateUserData from '../../state/actions/updateUserDataActions';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 70px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  position: absolute;
  z-index: 1;
  transform: ${(props) =>
          props.showSearch ? 'translateY(128%)' : 'translateY(-120%)'};
  right: 0;
  width: 40%;
  transition: transform 0.35s ease-in-out;

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .inputField {
    display: flex;
    align-items: center;
    //background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    padding-left: 10px;
    background-color: ${({ theme }) => theme.colors.secondary};

    svg {
      color: gray;
    }
`;

const SearchMessageForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const showSearchMessage = useSelector((state) => state.searchMessage);
  const filter = useSelector((state) => state.filterMessage);
  // const messages = useSelector((state) => state.messages);
  // const [filter, setFilter] = useState('');
  // const [filteredMessages, setFilteredMessages] = useState(messages);
  const dispatch = useDispatch();

  useEffect(() => {
      // setFilteredMessages(messages);
      if (showSearchMessage) {
        dispatch(toggleSearchMessage());
      }
      dispatch(setFilterMessage(''));
    }
    ,
    [id],
  )
  ;

  // useEffect(() => {

  // const result = messages.findIndex((message) =>
  //   message.data.message.startsWith(filter),
  // );
  // console.log(id);
  //
  // console.log(result);
  // setFilteredMessages(messages);
  //
  // if (filter.length > 0)
  //   setFilteredMessages(filteredMessages.filter((_, index) => index >= result));
  // else
  //   setFilteredMessages(messages);
  //
  // console.log(filteredMessages);

  // }, [filter]);

  return (
    <Wrapper showSearch={showSearchMessage}>
      {/* <form onSubmit={handleSubmit(handleUpdate)}> */}
      <Input icon={<SearchOutlined />}>
        <input type='text'
               placeholder='Szukaj'
               value={filter}
          // onChange={(e) => setFilter(e.target.value)}
               onChange={(e) => dispatch(setFilterMessage(e.target.value))}
        />
      </Input>
      {/* </form> */}
    </Wrapper>
  );
};

export default SearchMessageForm;

