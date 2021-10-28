import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import toggleTheme from 'state/actions/themeStyleActions';
import { Button, Tooltip } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const Wrapper = styled.div`
  width: 35px;
  height: 20px;
  border-radius: 25px;
  //border: 1px solid black;
  background-color: skyblue;
  display: flex;
  align-items: center;

  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  .dark {
    transform: translateX(17px);
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .dark_bgc {
    background-color: lightgray;
  }

`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: yellow;
  //transform: translateX(17px);
  transition: transform .2s ease-in-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 90%;
    height: 90%;

  }

`;

export default function ThemeSwitch() {
  const themeStyle = useSelector(state => state.themeStyle);
  const dispatch = useDispatch();
  return (
    <Tooltip title={themeStyle ? 'Tryb jasny' : 'Tryb ciemny'}>
      <Wrapper className={themeStyle ? 'dark_bgc' : ''}
               onClick={() => dispatch(toggleTheme())}>
        <Circle
          className={themeStyle ? 'dark' : ''}
        >
          {themeStyle ? <Brightness2Icon /> : <WbSunnyIcon />}
        </Circle>
      </Wrapper>
    </Tooltip>
  )
    ;
}
