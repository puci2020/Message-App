export const setCurrentProvider = (provider) => ({
  type: 'SET_CURRENT_PROVIDER',
  payload: provider,
});

export const removeCurrentProvider = () => ({
  type: 'REMOVE_CURRENT_PROVIDER',
});
