import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ServiceList from './components/ServiceList';
import Map from './components/Map';



export default class FindServices extends Component {
    render(){
        return (
            <View style={{flex:1}}>
                <Map />
                {/* <View style={styles.map}></View> */}
                <ServiceList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map:{
        flex:1,
        backgroundColor:'black',
    },
})