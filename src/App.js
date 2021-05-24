import React from 'react';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Chat from './components/Chat';
import Login from './components/Login';
import Registration from './components/Registration';
import Sidebar from './components/Sidebar';
import { actionTypes } from './services/reducer';
import { useStateValue } from './services/StateProvider';
import ProtectedRouter from './utils/ProtectedRouter';

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

    // useEffect(() => {
    //     if (user !== null) {
    //         localStorage.setItem('user', user);
    //     } else if (localStorage.getItem('user') !== null && !user) {
    //         dispatch({
    //             type: actionTypes.SET_USER,
    //             user: localStorage.getItem('user'),
    //         });
    //     } else {
    //         dispatch({
    //             type: actionTypes.SET_USER,
    //             user: null,
    //         });
    //     }

    //     console.log(localStorage.getItem('user'));

    //     console.log('setuser');
    // }, [dispatch, user]);

    return (
        <Wrapper>
            {console.log(user)}
            {console.log(localStorage.getItem(user))}
            {!localStorage.getItem(user) ? (
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Login />
                        </Route>
                        <Route path='/registration'>
                            <Registration />
                        </Route>
                    </Switch>
                </Router>
            ) : (
                <Router>
                    <Switch>
                        {/* <Container> */}
                        {/* <Sidebar /> */}
                        {/* <ProtectedRouter path='/room' component={Chat} />
                    <ProtectedRouter path='/room/:id' component={Chat} /> */}
                        <Route path='/room/:id'>
                            <Chat />
                        </Route>
                        <Route path='/room'>
                            <Chat />
                        </Route>
                        <Route exatc path='/'>
                            <Login />
                        </Route>
                        <Route path='/registration'>
                            <Registration />
                        </Route>
                        {/* </Container> */}
                    </Switch>
                </Router>
            )}
        </Wrapper>
    );
};

export default App;
