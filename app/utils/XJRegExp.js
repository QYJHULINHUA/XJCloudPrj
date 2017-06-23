
var regObj = {
  // 通用手机号码
      phoneReg: /^(13\d|14[57]|15[012356789]|17[03678]|18\d)\d{8}$/g,
      // 移动号码
      motionReg: /^(13[456789]|147|15[012789]|18[23478]|178|170)\d$/g,
      // 联通号码
      unicomReg: /^(13[012]|145|15[56]|176|18[56]|170)\d$/g,
      // 电信号码
      telecomReg: /^(133|153|17[37]|18[019]|170)\d$/g,
      // 电子邮箱
      emailReg: /^([a-zA-Z0-9_\+\-\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/g,
      // 密码
      passwordReg: /^(?=[a-z0-9]*\d)(?=[a-z0-9]*[a-z])[0-z0-9]{6,20}$/gi,
      // 身份证号码
      idCarNoReg: /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/g,
      // 电话号码
      telePhoneReg: /^((85[23]|0[1-9]\d{1,2})-)?\d{7,8}$/g,
      // 微信号码
      weixinReg: /^[a-zA-Z][a-zA-Z_0-9-]{5,19}$/g,
      // 中文文本
      chineseReg: /^[\u2E80-\u9FFF]+$/g,
      // url地址
      urlReg: /^((https|http):\/\/).+$/g,

      nicknameReg: /^[\u4e00-\u9fff\w]{5,16}$/,
};

var infoObj = {
  phoneError: '手机号码错误',
  emailError: '邮箱格式错误',
  verifyCodeError: '验证码错误',
  passwordError: '密码由6~20位的数字、字母组成',
  idCarNoError: '身份证号码有误',
  telePhoneError: '电话号码有误',
  weixinError: '微信号码有误',
  chineseError: '不是中文',
  urlError: 'url地址有误',
  nicenameError:'用户名有误',
};

// 工具函数，将输入源数字转字符，并去掉首尾的字符
function strTrim(str) {
  if (typeof str === 'number') {
    str = str.toString();
  }
  try {
    return str.trim();
  } catch (e) {
    console.log('XJRegExp ERROR:'+e);
    return str;
  }

};

RegExpTool = {

  phoneByReg:function(phone,config){

    // 配置信息
    let phoneNum = strTrim(phone),//传入的手机号
    resultObj={},//返回结果
    operatorInfor = false,
    phoneError = infoObj.phoneError,
    sectionStr;
    try {
       sectionStr = phoneNum.substring(0, 4)
    } catch (e) {
      console.log('XJRegExp ERROR:'+e);
      sectionStr = '';

    }

    // 判断传入的配置信息
    if (typeof config === 'object') {
        operatorInfor = config['detail'] ? config['detail'] : false;
        phoneError = config['error'] ? config['error'] : infoObj.phoneError;
    }

    // 匹配手机号
    if (regObj.phoneReg.test(phoneNum)) {
      regObj.phoneReg.lastIndex = 0;
      if (operatorInfor) {
        switch(true) {
            case regObj.telecomReg.test(sectionStr):
                resultObj['type'] = '电信';
                regObj.telecomReg.lastIndex = 0;
                break;
            case regObj.motionReg.test(sectionStr):
                resultObj['type'] = '移动';
                regObj.motionReg.lastIndex = 0;
                break;
            case regObj.unicomReg.test(sectionStr):
                resultObj['type'] = '联通';
                regObj.unicomReg.lastIndex = 0;
                break;
        }
      };
      resultObj['check'] = true;
      resultObj['success'] = '匹配成功';
    }else {
      resultObj['check'] = false;
      resultObj['error'] = phoneError;
    }
    return resultObj;
  },

  nickNameByReg: function(niceName,config) {
    let nicknameStr = strTrim(niceName),
        resultObj = {},
        nicknameError=infoObj.nicenameError
        nicknameLength = 0;
        try {
          nicknameLength = nicknameStr.length;
        } catch (e) {
          console.log('XJRegExp ERROR:'+e);
          nicknameLength = 0;
        }
        if (nicknameLength > 15 || nicknameLength === 0) {
          resultObj['check'] = false;
          resultObj['error'] = nicknameError;
        }else {
          resultObj['check'] = true;
          resultObj['success'] = '匹配aaa成功';
        }

        return resultObj;
  },

  emailByReg: function(email,config){
    let emailStr = strTrim(email),
        resultObj = {},
        emailError = infoObj.emailError;

        if (typeof config === 'object') {
          emailError = config['error'] ? config['error'] : infoObj.emailError;
        }

        if (regObj.emailReg.test(emailStr)) {
          regObj.emailReg.lastIndex = 0;

          resultObj['check'] = true;
          resultObj['success'] = '匹配成功';
        }else {
          resultObj['check'] = false;
          resultObj['error'] = emailError;
        }

        return resultObj;
  },

  passwordByReg: function(password, config) {
    var passwordStr     = strTrim(password),
        // 返回结果
        resultObj       = {},
        // 自定义错误信息
        passwordError   = infoObj.passwordError;

    // 判断传入的配置信息
    if (typeof config == 'object') {
        passwordError = config['error'] ? config['error'] : infoObj.passwordError;
    }

    if (regObj.passwordReg.test(passwordStr)) {
        regObj.passwordReg.lastIndex = 0;

        resultObj['check'] = true;
        resultObj['success'] = '匹配成功';
    } else {
        resultObj['check'] = false;
        resultObj['error'] = passwordError;
    }

    return resultObj;
  },

}

module.exports = RegExpTool;
