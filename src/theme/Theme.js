const theme = {
  colors: {
    background: '#9a9090',
    // background: '#dadbd3',
    primary: '#ecefea',
    // primary: '#ededed',
    secondary: '#f6f6f6',
    border: '#f6f6f6',

    message: {
      primary: 'white',
      // secondary: '#3aecdc7d',
      secondary: '#63d4ff7d',
    },

    menu: {
      navBackground: '#eff1f8',
      shadow: 'rgba(0,0,0, .2)',
      link: '#333',
      hoverLink: '#8d8b8f',
    },

    focus: '#cecece',
  },
  font: {
    weight: {
      thin: 300,
      regular: 400,
      plusRegular: 600,
      bold: 700,
    },
    space: {
      s: '.1rem',
      m: '.2rem',
    },
    size: {
      xxs: '12px',
      xs: '14px',
      s: '16px',
      m: '17px',
      l: '24px',
      xl: '40px',
    },
  },
  media: {
    phone: '@media(max-width: 767px)',
    tablet: '@media(max-width: 991px)',
  },
};

export default theme;
