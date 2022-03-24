const searchMessageReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SEARCH_MESSAGE':
      return !state;
    default:
      return state;
  }
};

export default searchMessageReducer;
