const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.payload;
    case 'REMOVE_MESSAGES':
      return [];
    default:
      return state;
  }
};

export default messagesReducer;
