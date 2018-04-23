import { combineReducers } from 'redux';
import user from './user';
import home from './home';

const rootReducers = combineReducers({
  user,
  home,
})
export default rootReducers;