import { createStackNavigator } from 'react-navigation';
import Admin from '.';
import UserList from './components/UserList';
import ServiceList from './components/ServiceList';
import EditUser from './components/UserList/components/EditUser';
import EditServices from './components/ServiceList/components/EditService';

const adminNav = createStackNavigator(
    {
        Admin,
        UserList,
        ServiceList,
        EditUser,
        EditServices,
        // Additional routes go here
    },
    {
        initialRouteName: 'Admin',
    },
    {
        headerMode: 'none',
        navigationOptions: {
            header: null,
            headerVisible: false,
        },
    }
);

export default adminNav;
