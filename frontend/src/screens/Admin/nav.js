import { createStackNavigator } from 'react-navigation';
import Admin from '.';
import UserList from './components/UserList';
import ServiceList from './components/ServiceList';
import EditUser from './components/UserList/components/EditUser';
import EditService from './components/ServiceList/components/EditService';
import AddService from './components/ServiceList/components/AddService';

const adminNav = createStackNavigator(
    {
        Admin,
        UserList,
        ServiceList,
        EditUser,
        EditService,
        AddService,
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
