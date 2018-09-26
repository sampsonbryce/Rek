import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ServiceList from './components/ServiceList';
import Map from './components/Map';


/*
 * Screen for finding services at a Rek store
 */
export default class FindServices extends Component {
    render(){
        return (
            <View style={{flex:1}}>
                <Map />
                <ServiceList />
            </View>
        )
    }
}
