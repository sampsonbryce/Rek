import React from 'react';
import { View, Text } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';

const Dashboard = props => {
    const { navigation } = props;
    return (
        <View>
            <Text>No appointments</Text>

            {/* Button to Schedule Appointments */}
            <Button
                onPress={() => {
                    navigation.navigate('CreateAppointment');
                }}
                title="Schedule Appointment"
            />

            {/* Button to Admin */}
            <Button
                onPress={() => {
                    navigation.navigate('Admin');
                }}
                title="Admin"
            />
        </View>
    );
};

Dashboard.propTypes = {
    navigation: PropTypes.instanceOf(Navigation).isRequired,
};

Dashboard.navigationOptions = {
    header: null,
};

export default Dashboard;
