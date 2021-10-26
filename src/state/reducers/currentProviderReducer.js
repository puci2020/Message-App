const currentProviderReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_PROVIDER':
      return action.payload;
    case 'REMOVE_CURRENT_PROVIDER':
      return [];
    default:
      return state;
  }
};

export default currentProviderReducer;
