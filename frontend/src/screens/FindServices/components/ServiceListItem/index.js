import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import gql from 'graphql-tag';


export default class ServiceListItem extends Component {
    render(){
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{this.props.name}</Text>
                <Text style={styles.text}>{this.props.job}</Text>
                <Button 
                    title="View"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        flex:1,
        width:150,
        borderRadius:10,
        borderColor: 'lightslategrey',
        borderWidth:1.5,
        margin:10,
    },
    text:{
        textAlign: 'center',
    },
})