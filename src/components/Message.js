import React from 'react';
import styled from 'styled-components';
import { compareDates, dateToString } from '../utils/Date';

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
    const showDate = (messageDate) => {
        const currentDate = new window.Date();
        // if (currentDate.getDay() > messageDate.getDay())
        //     return dateToString(messageDate);

        // console.log(currentDate);
        // console.log(dateToString(date));
        // console.log(date.toDate());
        compareDates(date, currentDate);
    };
    if (date) {
        showDate(date);
    }

    return (
        <Wrapper own={own}>
            <Author>{user}</Author>
            <Content>
                <div className='text'>{text}</div>
                <Date>{date ? dateToString(date) : ''}</Date>
            </Content>
        </Wrapper>
    );
};

export default Message;
