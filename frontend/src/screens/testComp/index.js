import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default class TestComp extends Component {
  static navigationOptions = {
        //header: null,
        //headerLeft: null,
    }

    render(){
        return (
            <View style={{flex:1}}>
              <Text>TESTING 123</Text>
            </View>
        )
    }
}
