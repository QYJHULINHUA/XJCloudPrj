
'use strict'

import * as TYPES from './types';

export const TABITEMSELECT_CONSTLIST = 'TABITEMSELECT_CONSTLIST';//用户列表
export const TABITEMSELECT_CONTRACT = 'TABITEMSELECT_CONTRACT';//业务模版
export const TABITEMSELECT_MYWORK = 'TABITEMSELECT_MYWORK';//我的、设置模块

export function tabSelecteConstlist(){
  return {
    type:TYPES.TABITEMSELECT_CONSTLIST,
  }
}

export function tabSelecteContract(){
  return {
    type:TYPES.TABITEMSELECT_CONTRACT,
  }
}

export function tabSelecteMywork(){
  return {
    type:TYPES.TABITEMSELECT_MYWORK,
  }
}
