import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useStateValue } from './services/StateProvider';

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    height: 100vh;
    /* display: grid;
  place-items: center; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.primary};
    height: 90vh;
    width: 90vw;
    box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
`;

const App = () => {
    const [{ user }, dispatch] = useStateValue();

    return (
        <Wrapper>
            {!user ? (
                <Login />
            ) : (
                <Router>
                    <Switch>
                        <Container>
                            <Sidebar />
                            <Route path='/room/:id'>
                                <Chat />
                            </Route>
                            <Route exact path='/'>
                                <Chat />
                            </Route>
                        </Container>
                    </Switch>
                </Router>
            )}
        </Wrapper>
    );
};

export default App;
