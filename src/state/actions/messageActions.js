export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  payload: message,
});

export const removeMessage = () => ({
  type: 'REMOVE_MESSAGE',
});
