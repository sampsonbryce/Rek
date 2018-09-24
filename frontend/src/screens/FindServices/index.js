import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ServiceList from './components/ServiceList';



export default class FindServices extends Component {
    render(){
        return (
            <View style={{flex:1}}>
                {/* <Map /> */}
                <View style={styles.map}></View>
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