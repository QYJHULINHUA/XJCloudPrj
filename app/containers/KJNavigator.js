
/*jshint esversion: 6 */
/**
 * KJNavigator.js
 * Created by hulinhua on 2017/3/24.
 * Copyright © 2017 hulinhua. All rights reserved.
 */


import { connect } from 'react-redux';
import { StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';

import LoginView from './login/KJLogin.js';
import RegistPage from './login/KJRegist.js'
import * as KJStyles from '../utils/KJStylesE.js'

import MyDiskScreen from './KJPage/KJDisk/KJMyDisk.js'
import MySetScreen from './KJPage/KJMywork/KJMyWorkZoon.js'
import MyFriendScreen from './KJPage/KJMyFriend/MYFriendlist.js'

import MySearchScreen from './KJPage/KJSearch/KJMySearch.js'
import MyTransferScreen from './KJPage/KJTransfer/KJMyTransfer.js'

/**
 * [MainScreenNavigator 登陆后的tabcontroller 界面]
 * @type {[TabNavigator]}
 */
const MainScreenNavigator = TabNavigator(
  {
    DiskScreen: { screen: MyDiskScreen },
    FriendScreen: { screen: MyFriendScreen },
    TransferScreen: { screen: MyTransferScreen },
    SearchScreen: { screen: MySearchScreen },
    SetScreen: { screen: MySetScreen },

  },
  {
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
    navigationOptions:{
      headerLeft:null,
      gesturesEnabled:false,
    },
    tabBarComponent:TabBarBottom,
    tabBarPosition:'bottom',
    tabBarOptions: {
      activeTintColor: '#00CD00',
      inactiveTintColor: 'gray',
      labelStyle: {
          fontSize: 12,
      },
    },

  }
);

const SimpleAppReactNavigation = StackNavigator(
  {
    Login: { screen: LoginView},
    Home: { screen: MainScreenNavigator },
    RegistV:{ screen: RegistPage }
  },
  {
    initialRouteName:'Login',
  }
);

 export default connect()(SimpleAppReactNavigation);
