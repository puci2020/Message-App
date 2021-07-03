export const initialState = {
  user: null,
  updateUserData: false,
  fileUpload: false,
  sidebar: false,
  currentProvider: [],
  // isNewUser: null,
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_UPDATE_USER_DATA: 'SET_UPDATE_USER_DATA',
  SET_FILE_UPLOAD: 'SET_FILE_UPLOAD',
  SET_SIDEBAR: 'SET_SIDEBAR',
  SET_CURRENT_PROVIDER: 'SET_CURRENT_PROVIDER',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        // isNewUser: action.isNewUser,
      };
    case actionTypes.SET_UPDATE_USER_DATA:
      return {
        ...state,
        updateUserData: action.updateUserData,
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
    case actionTypes.SET_CURRENT_PROVIDER:
      return {
        ...state,
        currentProvider: action.currentProvider,
      };
    default:
      return state;
  }
};

export default reducer;
