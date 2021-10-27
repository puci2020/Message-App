import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    font-family: Halvetica, sans-serif;
    //font-size: 10px;
  }

  @font-face {
    font-family: 'Pacifico';
    font-style: normal;
    font-weight: 400;
    src: local('Pacifico Regular'), local('Pacifico-Regular'), url(https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2) format('woff2');
    font-display: swap;
  }

  /* body{
    padding-top: 100px;
  } */
`;

export default GlobalStyle;
