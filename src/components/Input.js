import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin: 10px 0;

  span {
    padding-left: 10px;
    font-size: ${({ theme }) => theme.font.size.xs};
      /* letter-spacing: ${({ theme }) => theme.font.space.s}; */
    color: red;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  //background-color: white;
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  height: 35px;
  border-radius: 20px;
  padding-left: 10px;
  margin-bottom: 5px;

  border: ${(props) => (props.error ? '2px solid red' : '')};

  svg {
    color: ${({ theme }) => theme.colors.font.primary};
  }

  .error {
    border: 2px solid red;
  }

  input {
    border: none;
    outline: none;
    margin: 0 10px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.font.primary};
    background-color: ${({ theme }) => theme.colors.secondary};

    &::placeholder {
      color: ${({ theme }) => theme.colors.font.primary};
    }
  }
`;

const Input = ({ icon, error, children }) => (
  <Wrapper>
    <InputWrapper error={error}>
      {icon}
      {children}
    </InputWrapper>
    {error ? <span>{error}</span> : ''}
  </Wrapper>
);

export default Input;

Input.defaultProps = {
  error: null,
};

Input.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  error: PropTypes.string,
};
