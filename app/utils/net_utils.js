


let Global = require('./Global')
import Cookie from 'react-native-cookie';

const BASEURL = 'http://192.168.0.105:50002';
var reqUrl = {
  baseUrl:BASEURL,
  loginUrl:BASEURL + '/user/login/',
  registUrl:BASEURL + '/user/regist/',
  loginOutUrl:BASEURL + '/user/logout/',
  getInfomation:BASEURL + '/user/getInfomation/',
  getUserToken:BASEURL + '/user/token/',

};

exports.UpDataCookies = function (isSuccess) {


  if (isSuccess) {
    Cookie.get(BASEURL).then((data) => {
      try {
        Global.userToken = data.csrftoken;
      } catch (e) {
        Global.userToken= null;
      }
    });
  }else {
    Cookie.clear(BASEURL).then(() => {
      console.log(`clear all cookie from ${BASEURL}`);
    });
  }

};

/**
 * Post method
 * @param {String}   net_api    网络接口,必须
 * @param {object}   bodyData   body data json，必须
 * @param {Function} callback    回调，必须
 * @param {object}   netOptions 可选配置有headers，error(网络头，网络请求默认错误回调)
 */
export function NetWork_Post(net_api,bodyData,callback,netOptions) {


  let opt_headers,opt_error;
  if (typeof netOptions === 'object') {
    opt_headers = netOptions['headers'];
    opt_error = netOptions['error'];
  };

  post_header = opt_headers?opt_headers:{
    'Accept':'application/json',
    'Content-Type':'application/json',
    "X-CSRFToken":Global.userToken,
  };

  post_error = opt_error?opt_error:{
    status:'-1',
    msg:'请求失败',
  };

  let url = reqUrl[net_api];
  let fetchOptions = {
    method: 'POST',
    headers:post_header,
    credentials: 'include',
    body:JSON.stringify(bodyData),
  }


  fetch(url,fetchOptions)
  .then((response)=>response.text())
  .then((responseText)=>{

    let responseData = JSON.parse(responseText);
    callback(responseData);
  })
  .catch(error=>{
    callback(post_error);
  }).done();

}


/**
 * Get method
 * @param {String}   net_api    网络接口,必须
 * @param {Function} callback    回调，必须
 * @param {object}   netOptions  error(网络头，网络请求默认错误回调)
 */
exports.NetWork_Get = function (net_api,callback,netOptions) {

  let url = reqUrl[net_api];

  if (typeof netOptions === 'object') {
    opt_error = netOptions['error'];
  };

  get_error = opt_error?opt_error:{
    status:'-1',
    msg:'请求失败',
  };

  fetch(url,{
  method: 'GET',
  credentials: 'include'
})
  .then((response) => response.text())
  .then((responseText) => {
    let responseData = JSON.parse(responseText);
    callback(responseData);
  })
  .catch((error) => {
    callback(get_error);
  });
};
