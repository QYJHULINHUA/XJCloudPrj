
'use strict'

import * as TYPES from '../action/types'



export function tabbarReducer(state='用户列表',action) {
  switch (action.type) {
    case TYPES.TABITEMSELECT_CONSTLIST:
      return '用户列表';
    case TYPES.TABITEMSELECT_CONTRACT:
      return '业务模版';
    case TYPES.TABITEMSELECT_MYWORK:
      return '设置';
    default:
      return state;

  }
}
