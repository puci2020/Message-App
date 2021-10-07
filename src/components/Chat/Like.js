import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  width: fit-content;
  svg {
    width: 25px;
    height: 25px;

    &:hover {
      cursor: ${(props) => (props.own ? 'default' : 'pointer')};
    }
  }
`;

const Number = styled.div`
  padding: 2px;
  font-size: 14px;
  color: black;
`;

const Like = ({ own, liked, number, handleLike }) => (
  <Wrapper own={own}>
    {own ? null : (
      <>
        {liked ? (
          <FcLike onClick={handleLike} />
        ) : (
          <FcLikePlaceholder onClick={handleLike} />
        )}

        <Number>{number > 0 ? number : null}</Number>
      </>
    )}

    {own && number > 0 ? (
      <>
        <FcLike /> <Number>{number > 0 ? number : null}</Number>
      </>
    ) : null}
  </Wrapper>
);

export default Like;

Like.defaultProps = {
  own: false,
  liked: false,
  number: 0,
};

Like.propTypes = {
  own: PropTypes.bool,
  liked: PropTypes.bool,
  number: PropTypes.number,
  handleLike: PropTypes.func.isRequired,
};
