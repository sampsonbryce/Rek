import { createStackNavigator } from 'react-navigation';
import CreateAppointment from '.';
import ChooseServices from './ChooseServices';

const appointmentWizardNav = createStackNavigator(
    {
        CreateAppointment,
        ChooseServices,
    },
    {
        initialRouteName: 'CreateAppointment',
    },
    {
        headerMode: 'none',
        navigationOptions: {
            header: null,
            headerVisible: false,
        },
    }
);

export default appointmentWizardNav;
