import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class StatusBar extends Component{
    _bar(){
        if(this.props.message){
            return (
                <View style={[styles[this.props.type], styles.bar]}>
                    <Text style={styles.text}>{this.props.message}</Text>
                </View>
            )
        }
        else{
            return (<View></View>);
        }
    }

    render(){
        let status_bar = this._bar();
        return(
            <View>
                {status_bar}
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    error: {
        backgroundColor: 'red'
    },
    success: {
        backgroundColor: 'green'
    },
    bar: {
        padding: 15,
    }
})