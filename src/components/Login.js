import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import {auth, provider} from '../services/Firebase'
import { actionTypes } from '../services/reducer';
import {useStateValue} from '../services/StateProvider'

const Wrapper = styled.div`

`;

const Login = () => {
  const [{}, dispatch] = useStateValue();

    const login = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
            // isNewUser: result.isNewUser,
          });
        })
        .catch((error) => alert(error.message))
    }

  return (
    <Wrapper>
        <Button color="primary" variant="contained" type="submit" onClick={login}>Zaloguj się z Google</Button>
    </Wrapper>
  );
};
 
export default Login;