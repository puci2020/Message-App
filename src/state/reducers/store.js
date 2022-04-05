import { combineReducers } from 'redux';
import themeStyleReducer from 'state/reducers/themeStyleReducer';
import searchMessageReducer from 'state/reducers/searchMessageReducer';
import messagesReducer from 'state/reducers/messagesReducer';
import filterMessageReducer from 'state/reducers/filterMessageReducer';
import currentProviderReducer from './currentProviderReducer';
import emojiPickerReducer from './emojiPickerReducer';
import fileUploadReducer from './fileUploadReducer';
import loaderReducer from './loaderReducer';
import messageReducer from './messageReducer';
import sidebarReducer from './sidebarReducer';
import updateUserDataReducer from './updateUserDataReducer';
import userReducer from './userReducer';

const allReducers = combineReducers({
  sidebar: sidebarReducer,
  user: userReducer,
  updateUserData: updateUserDataReducer,
  fileUpload: fileUploadReducer,
  currentProvider: currentProviderReducer,
  emojiPicker: emojiPickerReducer,
  message: messageReducer,
  loader: loaderReducer,
  themeStyle: themeStyleReducer,
  searchMessage: searchMessageReducer,
  messages: messagesReducer,
  filterMessage: filterMessageReducer,
});

export default allReducers;
