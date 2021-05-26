import React from 'react';
import styled from 'styled-components';
import {
    compareDates,
    compareTimes,
    dateToString,
    showDate,
    showFullDate,
    showTime,
    timeToString,
} from '../utils/Date';

const Wrapper = styled.div`
    width: fit-content;
    margin-bottom: 20px;
    margin-left: ${(props) => (props.own ? 'auto' : '')};
    border-radius: 20px;
    padding: 10px;
    max-width: 60%;
    background-color: ${(props) => (props.own ? '#3aecdc7d' : 'white')};
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
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

const Message = ({ own, user, text, date }) => {
    return (
        <Wrapper own={own}>
            <Author>{user}</Author>
            <Content>
                <div className='text'>{text}</div>
                <Date>{date ? showFullDate(date) : ''}</Date>
            </Content>
        </Wrapper>
    );
};

export default Message;
