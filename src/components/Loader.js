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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 1;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: none;
`;

const Spinner = styled.div`
  width: 6rem;
  height: 6rem;
  display: inline-block;
  border: 6px solid rgba(147, 137, 229, 0.3);
  border-radius: 50%;
  border-top-color: rgba(147, 137, 229, 1);
  animation: 0.8s spin infinite ease-in-out;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader() {
  const classes = useStyles();

  return (
    <Wrapper>
      <div className={classes.root}>
        {/* <CircularProgress /> */}
        {/* <CircularProgress color="secondary" /> */}
        {/* loading */}
        {/* <div className="loader">Loading...</div> */}
        <Spinner />
      </div>
    </Wrapper>
  );
}
