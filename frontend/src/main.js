import React, { Component } from 'react';
import { View, Text} from 'react-native';

//For navigation
import AppNavigator from 'src/components/nav';

export default class Main extends Component{
    render(){
        return (
            <View style={{flex:1}}>
                <AppNavigator />
            </View>
        )
    }
}
