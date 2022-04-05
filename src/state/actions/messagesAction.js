export const setMessages = (messages) => ({
  type: 'SET_MESSAGES',
  payload: messages,
});

export const removeMessages = () => ({
  type: 'REMOVE_MESSAGES',
});
