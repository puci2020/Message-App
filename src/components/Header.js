import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90px;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  overflow: hidden;
  position: ${(props) => (props.fixed ? 'fixed' : 'static')};
  top: ${(props) => (props.fixed ? '0' : '')};
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;

const RightHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 10vw;

  #menuButton {
    display: none;
  }

  ${({ theme }) => theme.media.tablet} {
    #menuButton {
      display: block;
    }
  } ;
`;
// avatar in props
const Header = ({ fixed, left, right }) => (
  <Wrapper fixed={fixed}>
    {left}
    <RightHeader>{right}</RightHeader>
  </Wrapper>
);

export default Header;
Header.defaultProps = {
  fixed: false,
};

Header.propTypes = {
  fixed: PropTypes.bool,
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired,
};
