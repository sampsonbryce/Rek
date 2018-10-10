import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ServiceList from './components/ServiceList';
import Map from './components/Map';
import { StackActions, NavigationActions } from 'react-navigation';


/*
 * Screen for finding services at a Rek store
 */
export default class FindServices extends Component {
  static navigationOptions = {
        header: null,
        headerLeft: null,
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Map />
                <ServiceList navigation={this.props.navigation}/>
            </View>
        )
    }
}
