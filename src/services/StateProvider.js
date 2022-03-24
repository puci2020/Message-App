import PropTypes from 'prop-types';
import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

StateProvider.defaultProps = {
  children: null,
};

StateProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  children: PropTypes.element,
};
