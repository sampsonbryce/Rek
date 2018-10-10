import React, { Component } from 'react';
import { View } from 'react-native';
import Signup from 'src/screens/Signup'
import Login from 'src/screens/Login'
import FindServices from 'src/screens/FindServices';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';


const serviceNav = createStackNavigator(
  {
    FindServices: FindServices,
    //Additional routes go here
  },
  {
    initialRouteName: 'FindServices',
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
);

const loginNav = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
    //Additional routes go here
  },
  {
    initialRouteName: 'Login',
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: loginNav,
    FindServices: serviceNav,
  },
  {
    initialRouteName: 'Auth',
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);



export default class Main extends Component{
    render(){
        return (
          <AppNavigator></AppNavigator>
        )
    }
}
