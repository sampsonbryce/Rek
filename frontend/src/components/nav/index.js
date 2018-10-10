import React, { Component } from 'react';
import { View } from 'react-native';
import Signup from 'src/screens/Signup'
import Login from 'src/screens/Login'
import FindServices from 'src/screens/FindServices';
import TestComp from 'src/screens/testComp';

import { createStackNavigator, StackActions, NavigationActions, createSwitchNavigator, StackNavigator, SwitchNavigator } from 'react-navigation';

/*const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
    FindServices: FindServices,
  },
  {
    initialRouteName: 'Login',
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);*/

/*const AppNavigator = createSwitchNavigator(
  {
    Login: Login,
    Signup: Signup,
    FindServices: FindServices,
  },
  {
    initialRouteName: 'Login',
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);*/

const serviceNav = createStackNavigator(
  {
    FindServices: FindServices,
    TestComp: TestComp,
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
    //Login: Login,
    //Signup: Signup,
    //FindServices: FindServices,
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
