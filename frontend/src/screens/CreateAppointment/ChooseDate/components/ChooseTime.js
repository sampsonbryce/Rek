import React from 'react';
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

const renderAppointmentAvailability = item => {
    const { start, end } = item;
    return (
        <View>
            <Text>{start}</Text>
            <Text>{end}</Text>
        </View>
    );
};

// class ChooseTime extends Component {
const ChooseTime = () => (
    <View>
        <FlatList
            data={available_times}
            renderItem={({ item }) => renderAppointmentAvailability(item)}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
);

export default ChooseTime;
