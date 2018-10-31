import Signup from 'src/screens/Signup';
import Login from 'src/screens/Login';
import FindServices from 'src/screens/FindServices';
import Dashboard from 'src/screens/Dashboard';
import adminNav from 'src/screens/Admin/nav';
import CreateAppointmentNav from 'src/screens/CreateAppointment/nav';
import { BERRY_MAROON } from 'src/constants';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

/*
 * Main user navigator
 */
const dashboardNav = createStackNavigator(
    {
        FindServices,
        Dashboard,
        ...adminNav,
        ...CreateAppointmentNav,
    },
    {
        initialRouteName: 'Dashboard',
        navigationOptions: {
            headerStyle: {
                backgroundColor: BERRY_MAROON,
                paddingTop: 0,
                height: 50,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                paddingTop: 0,
            },
        },
    }
);

/*
 * Authentication navigator
 */
const loginNav = createStackNavigator(
    {
        Login,
        Signup,
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        navigationOptions: {
            header: null,
            headerVisible: false,
        },
    }
);

/*
 * Core navigator
 */
const AppNavigator = createSwitchNavigator(
    {
        Auth: loginNav,
        Dashboard: dashboardNav,
    },
    {
        // initialRouteName: 'Dashboard',
        initialRouteName: 'Auth',
        headerMode: 'none',
        navigationOptions: {
            header: null,
            headerVisible: false,
        },
    }
);

export default AppNavigator;
