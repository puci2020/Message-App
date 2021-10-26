const fileUploadReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_FILE_UPLOAD':
      return !state;
    default:
      return state;
  }
};

export default fileUploadReducer;
