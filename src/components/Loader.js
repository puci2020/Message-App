import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    overflow: 'hidden',
  },
}));

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function Loader() {
  const classes = useStyles();

  return (
    <Wrapper>
      <div className={classes.root}>
        {/* <CircularProgress /> */}
        <CircularProgress color="secondary" />
      </div>
    </Wrapper>
  );
}
