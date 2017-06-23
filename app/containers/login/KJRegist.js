import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';


import { WIDTH } from '../../utils/system_utils.js'
import {Main_SeprateLine_Color} from '../../utils/KJStylesE.js'

import { connect } from 'react-redux';
import { userInfoAction ,registAccount_act} from '../../myRedux/action/user_action.js'

import RegExpTool from '../../utils/XJRegExp'
import HeaderView from '../../components/KJHomePageHeadView'



class KJRegistClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telpNum: null,
      password:null,
      name:null,
    };
    this.clickRegistButton = this.clickRegistButton.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    header:<HeaderView tilte='注册' showBack={true} backBtnOnPress={()=>{
      navigation.goBack();
    }} />,
  });



  clickRegistButton(){

    //  验证手机，密码
    isTelpNum = RegExpTool.phoneByReg(this.state.telpNum);
    if (!isTelpNum.check) {
      Alert.alert(isTelpNum.error)
      return;
    }

    isNickname = RegExpTool.nickNameByReg(this.state.name);
    if (!isNickname.check) {
      Alert.alert(isNickname.error);
      return ;
    }

    isPW = RegExpTool.passwordByReg(this.state.password,{
      error:'密码格式有误',
    });
    if (!isPW.check) {
      Alert.alert(isPW.error)
      return;
    }

    //  密码md5 加密
    let CryptoJS = require("crypto-js");
    let pw_md5 = CryptoJS.MD5(this.state.password).toString();

    // 注册
    let formData = {
      telpNum:this.state.telpNum,
      pw:pw_md5,
      nickname:this.state.name,
    }

    registAccount_act(formData,(responseData)=>{
      console.log(responseData.status);

      if (responseData.status === '1') {
        this.props.dispatch(userInfoAction('user_telphone',this.state.telpNum))
        console.log('hhhh');

      }else {
        console.log('oooo');
      }

      Alert.alert(responseData.msg)
    });
  }

  render(){
    console.log('注册界面刷新....');
    return(
      <View style = {styles.imageStyle}>
        <View style = {styles.moude_1_style}>
          <TextInput
            style={styles.pwTextStyleR}
            underlineColorAndroid={'transparent'}
            placeholder='请输入手机号码'
            keyboardType='numeric'
            onSubmitEditing={this.clickRegistButton}
            onChangeText={(telpNum) => this.setState({telpNum})}
          />

          <TextInput
            style={styles.pwTextStyleR}
            underlineColorAndroid={'transparent'}
            placeholder='用户名'
            onSubmitEditing={this.clickRegistButton}
            onChangeText={(name) => this.setState({name})}
          />

        </View>

        <Text style={styles.tipTextStyle}>
          用户名不得超过十五个字符
        </Text>

        <View style = {styles.moude_2_style}>

          <TextInput
            style={styles.pwTextStyleR}
            underlineColorAndroid={'transparent'}
            secureTextEntry = {true}
            placeholder='请输入您的密码'
            onSubmitEditing={this.clickRegistButton}
            onChangeText={(password) => this.setState({password})}
          />

        </View>

        <Text style={styles.tipTextStyle}>
          密码由6~20位的数字、字母组成
        </Text>

        <View style={styles.registButtonStyle}>
          <Button title='注册' onPress={this.clickRegistButton}></Button>
        </View>

      </View>
    )
  };
}

const styles = StyleSheet.create({

  registButtonStyle:{
    marginTop:50,
    width:WIDTH,
    height:50,
    backgroundColor:'green',
    alignItems:'center',
    justifyContent:'center',
  },

  imageStyle:{
    flex:1,
    alignItems:'center',
    backgroundColor:'rgb(240,240,240)',

  },

  tipTextStyle:{
    marginTop:5,
    height:25,
    alignSelf:'flex-end',
    color:'red',
  },

  moude_1_style:{
    marginTop:20,
    backgroundColor:'white',
    width:WIDTH,
    height:120,
  },

  moude_2_style:{
    backgroundColor:'white',
    width:WIDTH,
    height:60,
  },
  pwTextStyleR:{
    width:WIDTH,
    height:60,
    textAlign:'left',
    borderWidth:1,
    borderColor:Main_SeprateLine_Color,
    paddingLeft:16,
  },

  // telphoneStype

});

function select(store){
   return {
    //  telpNum:store.userInfo.user_telphone,
    //  pw:store.userInfo.user_password,
   }
 }

 export default connect(select)(KJRegistClass);
