

import React ,{Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native'

import * as KJStyle from '../utils/KJStylesE'

export default class KJPageHeadView extends Component {

  static propTypes = {
    tilte:React.PropTypes.string,

    showBack:React.PropTypes.bool,//是否显示返回按钮
    backBtnOnPress:React.PropTypes.func,
    //leftImagePath

    showRightButton:React.PropTypes.bool,//是否显示右边的按钮
    rihghtBtnOnPress:React.PropTypes.func,
    // rightImagePath

    btnStyle:TouchableHighlight.propTypes.style,
  }

  static defaultProps = {
    showBack: false,
    showRightButton: false,

  }

  render(){
    let r_imgPath = this.props.rightImagePath?this.props.rightImagePath:require('./resource/btnAdd.png');
    let l_imgPath = this.props.leftImagePath?this.props.leftImagePath:require('./resource/title-icon-left.png');
    return(
      <View style = {styles.headViewStyle}>
        <View style = {styles.headBarStyle}></View>

        <View style = {styles.contentViewStyle}>
          {
            this.props.showBack?<TouchableHighlight
              style={[styles.btnDefaultStyle,this.props.btnStyle]}
              activeOpacity={0.5}
              underlayColor={'transparent'}
              onPress={this.props.backBtnOnPress}>
              <Image
                style={styles.btnDefaultImageStyle}
                source={l_imgPath}
              />
            </TouchableHighlight>:<View style={styles.btnDefaultStyle}></View>
          }

          <Text
            style = {styles.titleStyle}
            >{this.props.tilte}
          </Text>

          {
            this.props.showRightButton?<TouchableHighlight
              style={[styles.btnDefaultStyle,this.props.btnStyle]}
              activeOpacity={0.5}
              underlayColor={'transparent'}
              onPress={this.props.rihghtBtnOnPress}>
              <Image
                style={styles.btnDefaultImageStyle}
                source={r_imgPath}
              />
            </TouchableHighlight>:<View style={styles.btnDefaultStyle}></View>
          }
        </View>


      </View>
    );
  }



}


const styles= StyleSheet.create({

  headViewStyle:{
    backgroundColor: KJStyle.Main_Theme_Color,
    height: Platform.OS === 'ios'?64:44,
  },

  headBarStyle:{
    backgroundColor: KJStyle.Main_Theme_Color,
    height: Platform.OS === 'ios'?20:0,
  },

  contentViewStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height: 44,
    backgroundColor: KJStyle.Main_Theme_Color,
  },

  titleStyle:{
    color:'white',
    fontSize:KJStyle.Nav_Bar_Item_font,
    textAlign:'center',
  },

  btnDefaultStyle:{
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
  },

  btnDefaultImageStyle:{
    width:20,
    height:20,
  },

});
