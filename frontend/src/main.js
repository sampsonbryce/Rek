import React, { Component } from 'react';
import { View } from 'react-native';
import Signup from 'src/screens/Signup'
import Login from 'src/screens/Login'
import FindServices from 'src/screens/FindServices';

export default class Main extends Component{
    render(){
        return (
            <View style={{flex:1}}>
                {/* <Signup></Signup>
                  <Login></Login> */}
                <FindServices />
            </View>
        )
    }
}