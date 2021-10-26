const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload;
    case 'REMOVE_MESSAGE':
      return '';
    default:
      return state;
  }
};

export default messageReducer;
