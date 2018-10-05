import React, { Component } from 'react';
import { View, Text} from 'react-native';
// import Signup from 'src/screens/Signup'
// import Login from 'src/screens/Login'
// import FindServices from 'src/screens/FindServices';
import Admin from 'src/screens/Admin';
import EditUser from 'src/screens/Admin/components/EditUser';

export default class Main extends Component{
    render(){
        return (
            <View style={{flex:1}}>
                {/* <Signup></Signup>
                  <Login></Login> */}
                {/* <FindServices /> */}
                {/* <Admin /> */}
                <EditUser />
                {/* <Text>Hello</Text> */}
            </View>
        )
    }
}