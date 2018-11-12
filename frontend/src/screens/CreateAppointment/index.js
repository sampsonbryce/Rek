import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'src/components/Button';
import { PropTypes } from 'prop-types';
import { Navigation } from 'react-native-navigation';

/*
 * Starting point for creating appointment
 */
export default class CreateAppointment extends Component {
    static navigationOptions = {
        // header: null,
        title: 'Schedule Appointment',
    };

    static propTypes = {
        navigation: PropTypes.instanceOf(Navigation).isRequired,
    };

    render() {
        const { navigation } = this.props;

        return (
            <View>
                <Button
                    title="Start with Services"
                    onPress={() => {
                        navigation.navigate('ChooseServices');
                    }}
                />
                <Button
                    title="Start with People"
                    onPress={() => {
                        navigation.navigate('ChoosePeople');
                    }}
                />
                <Button
                    title="Start with Date/Time"
                    onPress={() => {
                        navigation.navigate('ChooseDate');
                    }}
                />
            </View>
        );
    }
}
