export const setFilterMessage = (message) => ({
  type: 'SET_FILTER_MESSAGE',
  payload: message,
});

export const removeFilterMessage = () => ({
  type: 'REMOVE_FILTER_MESSAGE',
});
