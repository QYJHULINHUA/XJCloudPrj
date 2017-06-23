
'use strict'

import * as TYPES from '../action/types'

export function userInfo_reducer(state=initUserInfo,action){
  switch (action.type) {
    case TYPES.UPDATE_ACCOUTN:
      return{
        ...state,
        user_account:action.account,
      }
    case TYPES.UPDATE_PASSWORD:
      return{
        ...state,
        user_password:action.password,
      }
    case TYPES.UPDATE_TELPHONE:
      return{
        ...state,
        user_telphone:action.telphone,
      }
    case TYPES.UPDATE_EMAIL:
      return{
        ...state,
        user_email:action.email,
      }
    case TYPES.UPDATE_AVATAR:
      return{
        ...state,
        user_avatar:action.avatar,
      }
    case TYPES.UPDATE_NICKNAME:
      return{
        ...state,
        user_nickname:action.nickname,
      }
    case TYPES.UPDATE_SEX:
      return{
        ...state,
        user_sex:action.sex,
      }
    // case TYPES.UPDATA_INFOMATION:
    //   return{
    //     ...state,
    //     user_sex:action.sex,
      // }
    default:
      return state;

  }

}

export function loginReducer(state=initLoginState,action) {
  switch (action.type) {
    case TYPES.LOGOUT:
      return{
        isLoggedIn:false,
        status:'LOGOUT',
        token:null,
      }
    case TYPES.LOGING:
      return{
        isLoggedIn:false,
        status:'LOGING',
        token:null,
      }
    case TYPES.LOGIN:
      return{
        isLoggedIn:true,
        status:'LOGIN',
        token:action.token,
      }
    case TYPES.LOGERROR:
      return{
        isLoggedIn:false,
        status:'LOGERROR',
        token:null,
      }

    default:
      return state;

  }
}


const initLoginState = {
  isLoggedIn:false,
  status:'LOGOUT',
  token:null,

}

const initUserInfo = {
  user_account:null,
  user_telphone:'18916259030',
  user_email:null,
  user_password:'HUhu7852',
  user_avatar:null,
  user_nickname:null,
  user_sex:'男',
}
