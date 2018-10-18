import Signup from 'src/screens/Signup';
import Login from 'src/screens/Login';
import FindServices from 'src/screens/FindServices';
import Dashboard from 'src/screens/Dashboard';
import adminNav from 'src/screens/Admin/nav';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

const dashboardNav = createStackNavigator(
    {
        FindServices,
        Dashboard,
        Admin: adminNav,
        // Additional routes go here
    },
    {
        initialRouteName: 'Dashboard',
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
    }
);

const loginNav = createStackNavigator(
    {
        Login,
        Signup,
        // Additional routes go here
    },
    {
        initialRouteName: 'Login',
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
    }
);

const AppNavigator = createSwitchNavigator(
    {
        Auth: loginNav,
        Dashboard: dashboardNav,
    },
    {
        initialRouteName: 'Auth',
        // initialRouteName: 'Dashboard',
    },
    {
        headerMode: 'none',
        navigationOptions: {
            header: null,
            headerVisible: false,
        },
    }
);

// export
export default AppNavigator;
