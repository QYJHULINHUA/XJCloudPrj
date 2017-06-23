import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native';

var SearchBar = React.createClass({
	render(){
		var ViewWidth = parseFloat(this.props.width);
		var ViewHeight = parseFloat(this.props.height);
		var SearchIcon_width = ViewHeight*0.6;
		return (
			<View style={[styles.container,{height:ViewHeight,width:ViewWidth},this.props.style]}>
				<View style={[styles.searchRow,{height:ViewHeight,width:ViewWidth}]}>
					<Image source={require('./search.png')} style={[{height:SearchIcon_width,width:SearchIcon_width}]}/>
		          	<TextInput
			            autoCapitalize="none"
			            autoCorrect={false}
			            clearButtonMode="always"
			            placeholder={this.props.text}
			            returnKeyType='search'
			            onSubmitEditing={this.changeText}
			            style={[styles.searchTextInput,{width:ViewWidth-(18+SearchIcon_width),height:ViewHeight}]}
		          	/>
	        	</View>
        	</View>
		);
	},
	changeText(event) {
		this.props.searchAction(event)
	}
});
var styles = StyleSheet.create({
  container: {
  	flex: 1,
  },
    searchRow: {
  	paddingLeft: 10,
	flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#cccccc',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
  },
  searchTextInput: {
    paddingLeft: 10,
  },
});

export default SearchBar
