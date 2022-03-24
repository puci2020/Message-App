const emojiPickerReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_EMOJI_PICKER':
      return !state;
    default:
      return state;
  }
};

export default emojiPickerReducer;
