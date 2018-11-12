import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'src/components/Button';
import PropTypes from 'prop-types';
import User from 'src/class/User';
import { Calendar } from 'react-native-calendars';

class EmployeeSchedule extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <Calendar
                onDayPress={day => {
                    console.log('day press: ', day);
                    navigation.navigate('DaySchedule', { day });
                }}
            />
        );
    }
}

export default EmployeeSchedule;
