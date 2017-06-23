/*jshint esversion: 6 */
'use strict'

import React ,{Component} from 'react';
import {Provider} from 'react-redux';

import store from './myRedux/store';
import MyNavigator from './containers/KJNavigator'


export default class App extends Component {
  render(){
    return(
      <Provider store = {store}>
        <MyNavigator/>
      </Provider>
    )
  }
}
