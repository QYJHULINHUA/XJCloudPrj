

import { combineReducers } from 'redux';
import { userInfo_reducer,loginReducer } from './user_reducer';
import {tabbarReducer} from './KJTable_reducer';

export default combineReducers({
  userInfo:userInfo_reducer,
  loginStatus:loginReducer,
  tabbarSelecte:tabbarReducer,
});
