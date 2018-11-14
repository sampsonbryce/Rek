import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Calendar } from 'react-native-calendars';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';
import _ from 'lodash';
import ApiError from 'src/class/Error';
import StatusBar from 'src/components/StatusBar';
import { BERRY_DARK_BLUE } from 'src/constants';
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

const ADD_WORKING_TIMES = gql`
    # mutation($dates: [String!]!, $start_time: String!, $end_time: String!) {
    #     addWorkingTimes(dates: $dates, start_time: $start_time, end_time: $end_time) {
    mutation($dates: [WorkingTimeInput!]!) {
        addWorkingTimes(dates: $dates) {
            workingTimes {
                id
                start
                end
            }
        }
    }
`;

/**
 * Contains logic for employees to add/edit their working times for each day
 */
class EmployeeSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: { message: '', type: null },
            date_dialog_visible: false,
            time_picker_visible: false,
            start_time: startOfToday(), // default val
            end_time: endOfToday(),
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

    async addWorkingTimes() {
        const { executeAddWorkingTimes } = this.props;
        const { selected_dates, start_time, end_time } = this.state;

        // close the dialog
        this.setState({ date_dialog_visible: false });

        // we store the dates the employee wants to work, and then separately we store
        // the times they want to work for those dates. All of these are JS Date object so
        // now we are just combining the dates and the times
        const dates = [];
        for (let i = 0; i < selected_dates.length; i += 1) {
            // clone to avoid using the same object reference
            let start = _.cloneDeep(selected_dates[i]);
            let end = _.cloneDeep(selected_dates[i]);

            start = setHours(start, getHours(start_time));
            start = setMinutes(start, getMinutes(start_time));
            end = setHours(end, getHours(end_time));
            end = setMinutes(end, getMinutes(end_time));

            // add dates to list in UTC ISO format
            dates.push({ start: start.toISOString(), end: end.toISOString() });
        }

        console.log('dates: ', dates);

        const variables = {
            dates,
        };

        let response = null;
        try {
            response = await executeAddWorkingTimes({ variables });
        } catch (err) {
            const error = new ApiError(err);
            this.setState({ status: { message: error.userMessage(), type: 'error' } });
            return;
        }

        console.log('response: ', response);

        this.setState({ status: { message: 'Added new working times!', type: 'success' } });

        // do something to update calendar
    }

    render() {
        const {
            date_dialog_visible,
            time_picker_visible,
            start_time,
            end_time,
            editing_time_for,
            selected_dates,
            status,
        } = this.state;

        const marked_dates = {};

        // create the marked_dates object for the calendar from selected_dates
        for (let i = 0; i < selected_dates.length; i += 1) {
            const date = selected_dates[i];
            marked_dates[format(date, 'YYYY-MM-DD')] = { selected: true };
        }

        return (
            <View>
                <StatusBar message={status.message} type={status.type} />
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
                    width="50%"
                    visible={date_dialog_visible}
                    onTouchOutside={() => {
                        this.setState({ date_dialog_visible: false });
                    }}
                >
                    <DialogContent>
                        {/* Start Time */}
                        <View style={styles.time}>
                            <Text>{format(start_time, 'HH:mm')}</Text>
                            <Button
                                title="Edit"
                                onPress={() => {
                                    this.setState({
                                        time_picker_visible: true,
                                        editing_time_for: 'start',
                                    });
                                }}
                            />
                        </View>

                        {/* End Time */}
                        <View style={styles.time}>
                            <Text>{format(end_time, 'HH:mm')}</Text>
                            <Button
                                title="Edit"
                                onPress={() => {
                                    this.setState({
                                        time_picker_visible: true,
                                        editing_time_for: 'end',
                                    });
                                }}
                            />
                        </View>

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
                                    if (isAfter(time_to_edit, end_time)) {
                                        // TODO: throw error here
                                        this.setState({ time_picker_visible: false });
                                        return;
                                    }
                                } else if (editing_time_for === 'end') {
                                    if (!isAfter(time_to_edit, start_time)) {
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
                        <Button
                            // style={styles.dialogButton}
                            // textStyle={styles.dialogButtonText}
                            title="Confirm"
                            onPress={() => {
                                this.addWorkingTimes();
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dialog: {
        width: '90%',
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dialogButton: {
        backgroundColor: BERRY_DARK_BLUE,
    },
    dialogButtonText: {
        color: 'white',
    },
});

const EmployeeScheduleGQL = graphql(ADD_WORKING_TIMES, {
    name: 'executeAddWorkingTimes',
})(EmployeeSchedule);

export default EmployeeScheduleGQL;
