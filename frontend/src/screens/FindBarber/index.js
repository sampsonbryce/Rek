import React, { Component } from 'react';
import { Text, View } from 'react-native';
import gql from 'graphql-tag';
import Info from './query.js';



export default class FindBarber extends Component {
    render(){
        return (
            <View>
                <Info></Info>
            </View>
        )
    }
}
