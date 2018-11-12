import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';

const available_times = [
    {
        start: '12',
        end: '1',
    },
    {
        start: '3',
        end: '4',
    },
    {
        start: '4',
        end: '5',
    },
];

class ChooseTime extends Component {
    renderAppointmentAvailability(item, index) {
        const { start, end } = item;
        return (
            <View>
                <Text>{start}</Text>
                <Text>{end}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    data={available_times}
                    renderItem={({ item, index }) =>
                        this.renderAppointmentAvailability(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default ChooseTime;
