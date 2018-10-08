import React, { Component } from 'react';
import { View, Text} from 'react-native';
// import Signup from 'src/screens/Signup'
// import Login from 'src/screens/Login'
import FindServices from 'src/screens/FindServices';
// import Admin from 'src/screens/Admin';

//For navigation
import AppNavigator from 'src/components/nav';

export default class Main extends Component{
    render(){
        return (
            <View style={{flex:1}}>
                {/* <Signup></Signup>
                  <Login></Login> */}
                <AppNavigator />
                {/* <Admin /> */}
                {/* <Text>Hello</Text> */}
            </View>
        )
    }
}
