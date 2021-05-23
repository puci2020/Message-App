// import { Looks } from '@material-ui/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
// import styled from 'styled-components';
// import Sidebar from '../components/Sidebar';
import { useStateValue } from '../services/StateProvider';

// const Container = styled.div`
//     display: flex;
//     background-color: ${({ theme }) => theme.colors.primary};
//     height: 90vh;
//     width: 90vw;
//     box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
// `;

const ProtectedRouter = ({ component: Component, ...rest }) => {
    const [{ user }] = useStateValue();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user !== null) {
                    console.log(rest);
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRouter;
