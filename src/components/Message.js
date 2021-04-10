import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: fit-content;
  margin-bottom: 20px;
  margin-left: ${(props) => (props.own ? "auto" : "")};
  border-radius: 20px;
  /* width: fit-content; */
  padding: 10px;
  max-width: 60%;
  background-color: ${(props) => (props.own ? "#3aecdc7d" : "white")};
`;

const Content = styled.div`
display: flex;
  span {
    margin-left: 10px;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    font-size: ${({ theme }) => theme.font.size.xxs};
    color: gray;
  }
`;

const Author = styled.span`
  /* margin-left: 10px; */
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.xxs};
`;

const Message = ({ own, user, text, date }) => {
  return (
    <Wrapper own={own}>
      <Author>{user}</Author>
      <Content>
        <p>{text}</p> <span>{date}</span>
      </Content>
    </Wrapper>
  );
};

export default Message;
