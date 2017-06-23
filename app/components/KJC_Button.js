/**
 * KJNavigator.js
 * Created by hulinhua on 2017/3/24.
 * Copyright © 2017 hulinhua. All rights reserved.
 */


 import React, { Component } from 'react';
 import {
     StyleSheet,
     TouchableHighlight,
     View,
     Text,

 } from 'react-native';

 export default class KJC_Button extends Component {

   static propsTypes = {

     textStyle:Text.propTypes.style,
     btnStyle:TouchableHighlight.propTypes.style,
     btnUnderlayColor:TouchableHighlight.propTypes.underlayColor,
   }

   static defaultProps ={
     btn_text:'button',
     
   }


   render(){

     return (
       <View
         style = {{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>

         <TouchableHighlight
           style={[styles.center,styles.btnDefaultStyle,this.props.btnStyle]}
           underlayColor={this.props.btnUnderlayColor}
           onPress={this.props.onPress}>

           <Text
             style={[styles.textDefaultStyle,this.props.textStyle]}>
             {this.props.btn_text}
           </Text>

         </TouchableHighlight>

       </View>
     )
   }

 }

 const styles= StyleSheet.create({
   center:{
     justifyContent:'center',
     alignItems:'center',
   },

   btnDefaultStyle:{
     width: 100,
     height: 20,
     backgroundColor: '#ff8447',
     borderColor: '#ff8447',

   },

   textDefaultStyle: {
     fontSize: 16,
     color: '#ffffff',
   },

 });
