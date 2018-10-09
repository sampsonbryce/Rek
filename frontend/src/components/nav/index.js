import React, { Component } from 'react';
import { View } from 'react-native';
import Signup from 'src/screens/Signup'
import Login from 'src/screens/Login'
import FindServices from 'src/screens/FindServices';

import { createStackNavigator } from 'react-navigation';

const AppNavigator = createStackNavigator(
  //Home: { screen: HomeScreen },
  //Profile: { screen: ProfileScreen },
  //Login: { screen: Login },
  //Signup: { screen: Signup },
  //FindServices: { screen: FindServices },
  {
    Login: Login,
    Signup: Signup,
    FindServices: FindServices,
  },
  /*{
    Login: { screen: Login },
    Signup: { screen: Signup },
    FindServices: { screen: FindServices }
  },*/
  {
    initialRouteName: 'Login',
  }
);

export default class Main extends Component{
    render(){
        return (
          <AppNavigator></AppNavigator>
        )
    }
}
