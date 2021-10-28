import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from 'components/Sidebar/Sidebar';

const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  width: 100vw;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
  ${({ theme }) => theme.media.tablet} {
    /* height: 80vh; */
  }
`;

// eslint-disable-next-line react/prop-types
const Container = ({ children, component, name, info }) => (
  <Wrapper>
    <Sidebar />
    {children}
  </Wrapper>
);

export default Container;

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
