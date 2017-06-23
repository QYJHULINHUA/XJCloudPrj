

import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  Alert,

} from 'react-native';

import { connect } from 'react-redux';
import KJC_Button from '../../components/KJC_Button.js';
import {showHUDLoading, hidenHUDLoading, showHUDMessage} from '../../components/react-native-HUD/HUD'

import { userInfoAction ,login_act,getToken_act} from '../../myRedux/action/user_action.js'
import RegExpTool from '../../utils/XJRegExp'

class KJLoginView extends Component {
  constructor(props) {
    super(props);
    this.clickButton = this.clickButton.bind(this);
    this.clickRegistButton = this.clickRegistButton.bind(this);
    this.clickForgetButton = this.clickForgetButton.bind(this);
  }

  static navigationOptions = {
    header:null,
  }

  // 注册
  clickRegistButton(){
    const { navigate } = this.props.navigation;
    navigate('RegistV')

  }

  //忘记密码
  clickForgetButton(){
    console.log('忘记密码');
  }

  //登录
  clickButton(){

    if (this.props.status === 'LOGING') {
      return ;
    }else {

      isTelpNum = RegExpTool.phoneByReg(this.props.telphone);
      if (!isTelpNum.check) {
        Alert.alert(isTelpNum.error)
        return;
      }

      isPW = RegExpTool.passwordByReg(this.props.pw,{
        error:'密码格式有误',
      });
      if (!isPW.check) {
        Alert.alert(isPW.error)
        return;
      }

      //  密码md5 加密
      let CryptoJS = require("crypto-js");
      let pw_md5 = CryptoJS.MD5(this.props.pw).toString();

      let formData = {
        telpNum:this.props.telphone,
        pw:pw_md5,
        'csrfmiddlewaretoken':'{{ csrf_token }}'
      }

      const {state } = this.props.navigation;
      token = state['key']

      this.props.dispatch(login_act(formData,token));

    }
  }


  shouldComponentUpdate(nextProps, nextState){

    switch (nextProps.status) {
      case 'LOGOUT':
        return true;
        break;

      case 'LOGING':
        showHUDLoading();
        return false;
        break;

      case 'LOGIN':

        if (this.props.status === 'LOGING') {
          hidenHUDLoading();
          // showHUDMessage('登陆成功');
          const { navigate } = this.props.navigation;
          navigate('Home')
        }

        return false;
        break;

      case 'LOGERROR':
        if (this.props.status === 'LOGING') {
          hidenHUDLoading();
          showHUDMessage('登陆失败');
        }
        return true;
        break;

      default:
        return true;
    }


  }

  render(){

    console.log('登陆界面刷新....');
    return(
      <Image
         style={styles.imageStyle}
         source={require('./resource/loginBackgroup.png')}>

         <StatusBar
           backgroundColor = '#5fb9ec'
           barStyle="light-content"
         />

         <Image
           style={styles.iconStyles}
           source={require('./resource/loginIcon.png')}
         />

         <View style={styles.textStyle}>
           <TextInput
             style={styles.pwTextStyleR}
             underlineColorAndroid={'transparent'}
             placeholder='手机号'
             keyboardType='numeric'
             value={this.props.telphone}
             onChangeText={(accountText) => {
               this.props.dispatch(userInfoAction('user_telphone',accountText))
             }}
           />
         </View>

         <View style={styles.pwTextStyle}>
           <TextInput
             style={styles.pwTextStyleR}
             underlineColorAndroid={'transparent'}
             secureTextEntry = {true}
             placeholder='password'
             onSubmitEditing={this.clickButton}
             value={this.props.pw}
             onChangeText={(passwordText) => {
               this.props.dispatch(userInfoAction('user_password',passwordText))
             }}
           />
         </View>

         <KJC_Button
           btn_text='login'
           btnStyle={styles.btnStyle}
           textStyle={styles.btnText}
           btnUnderlayColor='#FF7F00'
           onPress={this.clickButton}
         />

         <View style={styles.bottomViewStyle}>
           <KJC_Button
             btn_text='忘记密码'
             btnStyle={styles.btnStyle_bottom}
             onPress={this.clickForgetButton}

           />
           <KJC_Button
             btn_text='注册'
             btnStyle={styles.btnStyle_bottom}
             onPress={this.clickRegistButton}
           />
         </View>

       </Image>
    )
  }
}



const styles = StyleSheet.create({
  bottomViewStyle:{
    flexDirection:'row',
    position:'absolute',
    bottom:50,
  },
  imageStyle:{
    flex:1,
    alignItems:'center',
    width:null,
    width:null,
  },
  iconStyles:{
    top:100,
    width:100,
    height:100,
  },
  textStyle:{
    alignSelf:'center',
    top:140,
    width:240,
    height:40,
    borderBottomWidth:1,
    borderBottomColor:'rgb(194,174,108)',
  },
  pwTextStyle:{
    alignSelf:'center',
    top:160,
    width:240,
    height:40,
    borderBottomWidth:1,
    borderBottomColor:'rgb(194,174,108)',
  },
  pwTextStyleR:{
    width:240,
    height:40,
    textAlign:'center',
  },
  btnStyle:{
    top:200,
    width:240,
    height:40,
    borderRadius: 15,
    borderWidth:2,
  },
  btnStyle_bottom:{
    backgroundColor:'transparent',
    width:100,
    // color:'red',
  },
  btnText:{
    fontSize:16,
    color:'red',
  },
});

function select(store){
   return {
     telphone:store.userInfo.user_telphone,
     pw:store.userInfo.user_password,
     isLoggedIn: store.loginStatus.isLoggedIn,
     status: store.loginStatus.status,
   }
 }

 export default connect(select)(KJLoginView);
