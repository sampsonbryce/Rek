import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from 'src/components/Button';
import { Calendar } from 'react-native-calendars';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';
import _ from 'lodash';
import {
    startOfToday,
    endOfToday,
    format,
    setHours,
    getHours,
    getMinutes,
    setMinutes,
    parse,
    isAfter,
} from 'date-fns';

/**
 * Contains logic for employees to add/edit their working times for each day
 */
class EmployeeSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_dialog_visible: false,
            time_picker_visible: false,
            start: startOfToday(), // default val
            end: endOfToday(),
            editing_time_for: null, //  the state field we want the TimePicker to update ( start or end)
            selected_dates: [],
        };
    }

    // Adds/removes a date from the states selected_dates array
    toggleDate(date) {
        const { selected_dates } = this.state;
        const selected_date = parse(date.dateString);

        // see if we can find the date in the array
        if (_.find(selected_dates, d => d.toISOString() === selected_date.toISOString())) {
            // remove it if we find it
            _.remove(selected_dates, d => d.toISOString() === selected_date.toISOString());
        } else {
            // otherwise add it
            selected_dates.push(selected_date);
        }

        // Update state. Clone to ensure state update is detected
        this.setState({ selected_dates: _.clone(selected_dates) });
    }

    render() {
        const {
            date_dialog_visible,
            time_picker_visible,
            start,
            end,
            editing_time_for,
            selected_dates,
        } = this.state;

        const marked_dates = {};

        // create the marked_dates object for the calendar
        for (let i = 0; i < selected_dates.length; i += 1) {
            const date = selected_dates[i];
            marked_dates[format(date, 'YYYY-MM-DD')] = { selected: true };
        }

        return (
            <View>
                {/* Calendar */}
                <Calendar
                    onDayPress={date => this.toggleDate(date)}
                    minDate={format(new Date(), 'YYYY-MM-DD')}
                    markedDates={marked_dates}
                />
                <Button
                    title="Choose Time"
                    onPress={() => {
                        this.setState({
                            date_dialog_visible: true,
                        });
                    }}
                />

                {/* Dialog for selecting start and end times for selected dates */}
                <Dialog
                    visible={date_dialog_visible}
                    onTouchOutside={() => {
                        this.setState({ date_dialog_visible: false });
                    }}
                >
                    <DialogContent>
                        {/* Start Time */}
                        <Text>{format(start, 'HH:mm')}</Text>
                        <Button
                            title="Edit"
                            onPress={() => {
                                this.setState({
                                    time_picker_visible: true,
                                    editing_time_for: 'start',
                                });
                            }}
                        />

                        {/* End Time */}
                        <Text>{format(end, 'HH:mm')}</Text>
                        <Button
                            title="Edit"
                            onPress={() => {
                                this.setState({
                                    time_picker_visible: true,
                                    editing_time_for: 'end',
                                });
                            }}
                        />

                        <DateTimePicker
                            isVisible={time_picker_visible}
                            mode="time"
                            onConfirm={time => {
                                // update datetime object to avoid changing the date as
                                // onConfirm returns a date object for the current day
                                let { [editing_time_for]: time_to_edit } = this.state;

                                // update hours and minutes of currently editing time object
                                const hours = getHours(time);
                                const minutes = getMinutes(time);

                                time_to_edit = setHours(time_to_edit, hours);
                                time_to_edit = setMinutes(time_to_edit, minutes);

                                // error check the new time
                                if (editing_time_for === 'start') {
                                    if (isAfter(time_to_edit, end)) {
                                        // TODO: throw error here
                                        this.setState({ time_picker_visible: false });
                                        return;
                                    }
                                } else if (editing_time_for === 'end') {
                                    if (!isAfter(time_to_edit, start)) {
                                        // TODO: throw error here
                                        this.setState({ time_picker_visible: false });
                                        return;
                                    }
                                }

                                // update time states
                                this.setState({
                                    [editing_time_for]: time_to_edit,
                                    time_picker_visible: false,
                                });
                            }}
                            onCancel={() => this.setState({ time_picker_visible: false })}
                        />
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

export default EmployeeSchedule;
