import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, TouchableHighlight } from 'react-native';
import { BERRY_MAROON } from 'src/constants';

class TimeList extends Component {
    listOfTimes() {
        // get active times so we can indicate which times are selected
        const { activeTimes } = this.props;
        const times = [];
        for (let i = 0; i < 24; i += 1) {
            let start = `${i}:00:00`;

            // add extra 0 to time if needed
            if (i < 10) {
                start = `0${i}:00:00`;
            }

            // set if time is active(selected)
            let active = false;
            if (activeTimes.includes(start)) {
                active = true;
            }

            times.push({ start, active });
        }
        return times;
    }

    renderTimeItem(time) {
        const { onTimePress } = this.props;
        const style = [styles.timeBlock];
        const textStyle = [];
        if (time.active) {
            style.push(styles.active);
            textStyle.push(styles.timeTextActive);
        }
        console.log('rendering time item: ', time);
        return (
            <TouchableHighlight style={style} onPress={() => onTimePress(time)}>
                <Text style={textStyle}>{time.start}</Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <FlatList
                data={this.listOfTimes()}
                renderItem={({ item }) => this.renderTimeItem(item)}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    timeBlock: {
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: BERRY_MAROON,
    },
    timeTextActive: {
        color: 'white',
    },
    active: {
        backgroundColor: BERRY_MAROON,
    },
});

export default TimeList;
