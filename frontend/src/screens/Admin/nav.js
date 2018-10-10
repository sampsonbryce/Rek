import { createStackNavigator } from 'react-navigation';
import Admin from './';
import EditUser from './components/EditUser';

const adminNav = createStackNavigator(
  {
    Admin,
    EditUser,
    //Additional routes go here
  },
  {
    initialRouteName: 'Admin',
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
);
export default adminNav;