import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Container from '../components/Container';
import { useAuth } from '../services/AuthProvider';

// eslint-disable-next-line react/prop-types
const ProtectedRouter = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Container>
            <Component {...props} />
          </Container>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRouter;
