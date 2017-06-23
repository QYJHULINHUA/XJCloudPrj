
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
  NativeModules,
} from 'react-native';

import { Form,Button,Util } from 'react-native-wxui';
import { connect } from 'react-redux';
import HeaderView from '../../../components/KJHomePageHeadView.js'
import {loginOut_act,getUserInfo_act,userInfoAction} from '../../../myRedux/action/user_action'
import ActionSheet from 'react-native-actionsheet'


var ImagePicker = NativeModules.ImageCropPicker;

class MySetScreen extends Component {
  constructor(props) {
    super(props);
  }

// getUserInfo_act
  componentWillMount(){

    getUserInfo_act((response)=>{
      if (response.status === '1') {
        userData = response.msg;
        try {
          this.props.dispatch(userInfoAction('user_account',userData['nickName']))
          this.props.dispatch(userInfoAction('user_telphone',userData['telphone']))
          this.props.dispatch(userInfoAction('user_email',userData['email']))
          this.props.dispatch(userInfoAction('user_avatar',userData['avatar']))
          this.props.dispatch(userInfoAction('user_sex',userData['sex']))

        } catch (e) {
          console.log(e);
        }


      }else {
        console.log('获取用户信息失败');
      }
    })

  }


  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon:({tintColor})=>(
      <Image
        source={require('../../resource/my.png')}
        style={{width: 20,height: 20,tintColor: tintColor}}
      />
    ),
    header:<HeaderView tilte='我的'/>,
  }

  handlePress(i) {
    switch (i) {
      case 0:

      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      })
      .then(image => {
        console.log(image);
      })
      .catch(e => {
        console.log(e);
      });

        break;
      case 1:
        console.log('拍照');
        break;
      case 2:
        console.log('取消');
        break;
      default:

    }
  }

  render(){
    return(
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <TouchableHighlight underlayColor="rgb(228,228,228)" onPress={() => {
          // console.log('点击头像')
          this.ActionSheet.show()
        }}>
          <View style={styles.avatarStyle}>
            <View style={{flexDirection:'row',alignItems: 'center'}}>

              <Image
                 source={{uri: this.props.avatar===null?'http://':this.props.avatar}}
                 defaultSource={require('./icon/avatarImageDefault.png')}
                 style={styles.avatarImageStyle} />

              <Text style={styles.avatarTextStyle}>{this.props.account}</Text>
            </View>
            <View><Image source={require('../../resource/right-arrow.png')} style={styles.avatarIconStyle} /></View>
          </View>
        </TouchableHighlight>

          <Form.Form onFieldChange={this._handleChange}>
            <Form.Separator/>


              <Form.LinkField
                  label="手机号"
                  text={this.props.telpNum}
                  onPress={() => {
                      console.log('LinkField pressed!')
                  }}
                  iconLeft={
                      <Image source={require('./icon/telphone.png')} style={styles.iconLeft} />
                  }
                  iconRight={<Image source={require('../../resource/right-arrow.png')} style={styles.iconRight} />} />

              <Form.LinkField
                  label="邮箱"
                  text={this.props.email===null?'设置您的邮箱':this.props.email}
                  onPress={() => {
                      console.log('LinkField pressed!')
                  }}
                  iconLeft={
                      <Image source={require('./icon/email.png')} style={styles.iconLeft} />
                  }
                  iconRight={<Image source={require('../../resource/right-arrow.png')} style={styles.iconRight} />} />

              <Form.LinkField
                  label="性别"
                  text={this.props.sex==='male'?'男':'女'}
                  onPress={() => {
                      console.log('LinkField pressed!')
                  }}
                  iconLeft={
                      <Image source={require('./icon/sex.png')} style={styles.iconLeft} />
                  }
                  iconRight={<Image source={require('../../resource/right-arrow.png')} style={styles.iconRight} />} />


              <Form.LinkField
                  label="密码"
                  text='修改密码'
                  onPress={() => {
                      console.log('LinkField pressed!')
                  }}
                  iconLeft={
                      <Image source={require('./icon/password.png')} style={styles.iconLeft} />
                  }
                  iconRight={<Image source={require('../../resource/right-arrow.png')} style={styles.iconRight} />} />


              <Form.Separator/>



              <Form.LinkField
                  label="意见反馈"
                  text='    '
                  onPress={() => {
                      console.log('LinkField pressed!')
                  }}
                  iconLeft={
                      <Image source={require('./icon/opinion.png')} style={styles.iconLeft} />
                  }
                  iconRight={<Image source={require('../../resource/right-arrow.png')} style={styles.iconRight} />} />

              <Form.LinkField
                  label="版本"
                  text='v1.0.0'
                  iconLeft={
                      <Image source={require('./icon/version.png')} style={styles.iconLeft} />
                  }/>

              <Form.LinkField
                  label="使用协议"
                  text='    '
                  onPress={() => {
                      console.log('LinkField pressed!')
                  }}
                  iconLeft={
                      <Image source={require('./icon/protocol.png')} style={styles.iconLeft} />
                  }
                  iconRight={<Image source={require('../../resource/right-arrow.png')} style={styles.iconRight} />} />
              <Form.Separator/>

              <Form.SwitchField label="记住密码" ref="SwitchField" />
              <Form.SwitchField label="文件共享" ref="SwitchField"/>

              <Form.Separator />
              <Button
                  style={styles.button}
                  textStyle={styles.text}
                  onPress={()=>{

                    loginOut_act((response)=>{
                      console.log(response);
                    })
                   this.props.navigation.goBack(numberOfPages=0);
                  }}>

                  退出登录
              </Button>
              <Form.Separator />
              <Form.Separator />
          </Form.Form>

          <ActionSheet
          ref={o => this.ActionSheet = o}
          title='选择你的头像'
          options={[ '从相册中选择', '拍照', '取消',]}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={this.handlePress}
        />


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f7f4',
        flex: 1,
    },

    avatarStyle:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
      backgroundColor:'white',
      flex: 1,
      width:null,
      height:100,

    },
    avatarTextStyle:{
      left:20,
      fontSize:15,
    },

    avatarImageStyle:{
      left:10,
      width:80,
      height:80,
      borderRadius:40,


    },

    avatarIconStyle:{
      width: 15,
      height: 10,
      right:15,
      // position:'absolute',
      // position:'relative',
    },


    iconLeft: {
        width: 20,
        height: 20,

    },
    iconRight: {
        width: 15,
        height: 10,
        right:15,
        // marginTop:5,

    },

    button: {
        height: 50,
        width: Util.WIDTH,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 0
    },
    text: {
        fontSize: 16,
        color: 'red'
    }
})


function select(store){
   return {
     account:store.userInfo.user_account,
     telpNum:store.userInfo.user_telphone,
     email:store.userInfo.user_email,
     avatar:store.userInfo.user_avatar,
     sex:store.userInfo.user_sex,


   }
 }

 export default connect(select)(MySetScreen);
