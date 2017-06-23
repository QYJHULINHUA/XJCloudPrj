
'use strict'

import * as TYPES from './types';
import {NetWork_Post,NetWork_Get,UpDataCookies} from '../../utils/net_utils';

export function userInfoAction(user_type,user_param){
  switch (user_type) {
    case 'user_account':
      return{
        type:TYPES.UPDATE_ACCOUTN,
        account:user_param,
      }
      break;

    case 'user_password':
      return{
        type:TYPES.UPDATE_PASSWORD,
        password:user_param,
      }
      break;
    case 'user_telphone':
      return{
        type:TYPES.UPDATE_TELPHONE,
        telphone:user_param,
      }
      break;
    case 'user_email':
      return{
        type:TYPES.UPDATE_EMAIL,
        email:user_param,
      }
      break;
    case 'user_avatar':
      return{
        type:TYPES.UPDATE_AVATAR,
        avatar:user_param,
      }
      break;
    case 'user_nickname':
      return{
        type:TYPES.UPDATE_NICKNAME,
        nickname:user_param,
      }
      break;
    case 'user_sex':
      return{
        type:TYPES.UPDATE_SEX,
        sex:user_param,
      }
      break;


    default:

  }
}

export function getToken_act(callback) {
  let netapi = 'getUserToken',reqError = {error:{status:'-1',msg:'获取token失败'}};

  NetWork_Get(netapi,callback,reqError);
}


export function registAccount_act(bodydata,callback) {
  let netapi = 'registUrl',reqError = {error:{status:'-1',msg:'注册失败'}};
  NetWork_Post(netapi,bodydata,callback,reqError);
}

export function loginOut_act(callback) {

  let netapi = 'loginOutUrl',reqError = {error:{status:'-1',msg:'退出异常'}};
  NetWork_Post(netapi,null,callback,reqError);

}


export function getUserInfo_act(callback) {
  let netapi = 'getInfomation',reqError = {error:{status:'-1',msg:'获取用户信息失败'}};
  NetWork_Post(netapi,null,callback,reqError);
}

export function login_act(bodydata,loginToken) {
  return (dispatch) => {
		dispatch({type: TYPES.LOGING});

    let netapi = 'loginUrl';
    let reqError = {error:{status:'-1',msg:'登录失败'}};

    // 网络处理函数
    let callback_func = function callback_response(responseJson) {
      if (responseJson.status === '1') {
        UpDataCookies(true)
        dispatch({type: TYPES.LOGIN,token:loginToken});

      }else {
        UpDataCookies(false)
        dispatch({type: TYPES.LOGERROR});
      }
    };

    NetWork_Post(netapi,bodydata,callback_func,reqError);

	}
}
