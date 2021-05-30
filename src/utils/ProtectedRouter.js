import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

// eslint-disable-next-line react/prop-types
const ProtectedRouter = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRouter;
