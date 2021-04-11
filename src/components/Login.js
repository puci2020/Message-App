import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import {auth, provider} from '../services/Firebase'

const Wrapper = styled.div`

`;

const Login = () => {
    const login = () => {
        auth.signInWithPopup(provider)
        .then((result) => console.log(result))
        .catch((error) => alert(error.message))
    }

  return (
    <Wrapper>
        <Button type="submit" onClick={login}>Zaloguj się z Google</Button>
    </Wrapper>
  );
};
 
export default Login;