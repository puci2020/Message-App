import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid lightgray;
  overflow: hidden;
  position: ${props => props.fixed ? 'fixed': 'static'};
  top: ${props => props.fixed ? '0': ''};
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;


const RightHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;
`;

const Header = ({ avatar, fixed, left, right }) => {
  return (
    <Wrapper fixed={fixed}>
      {left}
      <RightHeader>{right}</RightHeader>
    </Wrapper>
  );
};

export default Header;