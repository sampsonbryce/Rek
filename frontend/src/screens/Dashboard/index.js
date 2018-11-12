import React from 'react';
import { View } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import User from '../../class/User';

const Dashboard = props => {
    const { navigation, user } = props;

    return (
        <View>
            {/* Button to Schedule Appointments */}
            <Button
                onPress={() => {
                    navigation.navigate('CreateAppointment');
                }}
                title="Schedule Appointment"
            />

            <Button
                onPress={() => {
                    navigation.navigate('Profile');
                }}
                title="Profile"
            />

            {/* Button to Admin */}
            {user.roles.admin && (
                <Button
                    onPress={() => {
                        navigation.navigate('Admin');
                    }}
                    title="Admin"
                />
            )}
        </View>
    );
};

Dashboard.propTypes = {
    navigation: PropTypes.instanceOf(Navigation).isRequired,
    user: PropTypes.shape(User).isRequired,
};

Dashboard.navigationOptions = {
    header: null,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(
    mapStateToProps,
    null
)(Dashboard);
