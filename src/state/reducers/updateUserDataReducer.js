const updateUserDataReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_UPDATE_USER_DATA':
      return !state;
    default:
      return state;
  }
};

export default updateUserDataReducer;
