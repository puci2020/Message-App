export const initialState = {
  user: null,
  passwordReset: false,
  fileUpload: false,
  sidebar: false,
  // isNewUser: null,
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_PASSWORD_RESET: 'SET_PASSWORD_RESET',
  SET_FILE_UPLOAD: 'SET_FILE_UPLOAD',
  SET_SIDEBAR: 'SET_SIDEBAR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        // isNewUser: action.isNewUser,
      };
    case actionTypes.SET_PASSWORD_RESET:
      return {
        ...state,
        passwordReset: action.passwordReset,
      };
    case actionTypes.SET_FILE_UPLOAD:
      return {
        ...state,
        fileUpload: action.fileUpload,
      };
    case actionTypes.SET_SIDEBAR:
      return {
        ...state,
        sidebar: action.sidebar,
      };
    default:
      return state;
  }
};

export default reducer;
