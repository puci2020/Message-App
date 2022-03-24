import 'alertifyjs/build/css/alertify.css';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import { darkTheme, lightTheme } from './Theme';

const Layout = ({ children }) => {
  const themeStyle = useSelector(state => state.themeStyle);
  return (
    <ThemeProvider theme={themeStyle ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
