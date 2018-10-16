import React from 'react';
import { View, Text } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';

function Dashboard(props) {
    const { navigation } = props;
    return (
        <View>
            <Text>No appointments</Text>

            {/* Button to Schedule Appointments */}
            <Button
                onPress={() => {
                    navigation.navigate('FindServices');
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
}

Dashboard.propTypes = {
    navigation: PropTypes.instanceOf(Navigation).isRequired,
};

export default Dashboard;
