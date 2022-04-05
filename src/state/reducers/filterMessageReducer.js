const filterMessageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER_MESSAGE':
      return action.payload;
    case 'REMOVE_FILTER_MESSAGE':
      return '';
    default:
      return state;
  }
};

export default filterMessageReducer;
