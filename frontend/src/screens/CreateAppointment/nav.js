import { createStackNavigator } from 'react-navigation';
import CreateAppointment from '.';
import ChooseServices from './ChooseServices';
import ChoosePeople from './ChoosePeople';

const appointmentWizardNav = createStackNavigator(
    {
        CreateAppointment,
        ChooseServices,
        ChoosePeople,
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
