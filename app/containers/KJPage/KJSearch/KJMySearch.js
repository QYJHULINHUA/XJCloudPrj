
import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import HeaderView from '../../../components/KJHomePageHeadView.js'

class MySearchScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: '搜索',
    tabBarIcon:({tintColor})=>(
      <Image
        source={require('../../resource/search.png')}
        style={{width: 20,height: 20,tintColor: tintColor}}
      />
    ),
    header:<HeaderView tilte='搜索'/>,
  }

  // const { navigate } = this.props.navigation;
  // static navigationOptions = {
  //   tabBarLabel:'Disk',
  //   TabBarIcon:({tintColor}) => (
  //     <Image
  //       source={require('../../resource/GJMycontracts.png')}
  //       style={[styles.icon, {tintColor: tintColor}]}
  //     />
  //   ),
  // }

  render(){

    return(
      <View>
        <Text>haha</Text>
      </View>
    );
  }
}


function select(store){
   return {
     telpNum:store.userInfo.user_telphone,
     pw:store.userInfo.user_password,
   }
 }

 export default connect(select)(MySearchScreen);
