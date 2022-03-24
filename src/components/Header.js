import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90px;
  padding: 20px;
  z-index: 2;
  border-bottom: 1px solid ${(props) => (props.isChatTitle ? `${props.theme.colors.borderSecondary}` : `${props.theme.colors.border}`)};;
  overflow: hidden;
  position: ${(props) => (props.fixed ? 'fixed' : 'static')};
  top: ${(props) => (props.fixed ? '0' : '')};
  color: ${(props) => (props.isChatTitle ? `${props.theme.colors.font.secondary}` : `${props.theme.colors.font.primary}`)};
  background-color: ${(props) => (props.isChatTitle ? `${props.theme.colors.tertiary}` : `${props.theme.colors.primary}`)};

  svg {

    color: ${(props) => (props.isChatTitle ? props.theme.colors.font.secondary : props.theme.colors.font.primary)};
  }
`;

const RightHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 5vw;


  #menuButton {
    display: none;
  }

  ${({ theme }) => theme.media.tablet} {
    #menuButton {
      display: block;
    }
  }
;
`;
// avatar in props
const Header = ({ fixed, left, right, isChatTitle }) => (
  <Wrapper fixed={fixed}
           isChatTitle={isChatTitle}>
    {left}
    <RightHeader>{right}</RightHeader>
  </Wrapper>
);

export default Header;
Header.defaultProps = {
  fixed: false,
  isChatTitle: false,
};

Header.propTypes = {
  fixed: PropTypes.bool,
  isChatTitle: PropTypes.bool,
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired,
};
