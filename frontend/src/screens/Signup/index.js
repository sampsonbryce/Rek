import React, { Component }from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

export default class Signup extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <Text style={
                    styles.text
                }>Economica</Text>
                <TextInput placeholder="email">
                </TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Economica'
    }
})